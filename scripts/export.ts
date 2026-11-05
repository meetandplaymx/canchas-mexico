import { writeFileSync } from "node:fs";
const R = "<meetandplay-repo>/apps/web/src/data/directory";
const SPORTS = ["tennis", "padel", "pickleball"] as const;
const q = (v: string | number | undefined) => {
  const s = v === undefined ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const main = async () => {
  const idx: any = await import(`${R}/index-data.ts`);
  const cityName = new Map<string, string>(idx.DIRECTORY_CITY_INDEX.map((c: any) => [c.slug, c.name]));
  const states: any[] = idx.DIRECTORY_STATE_INDEX;
  const raw: any = (await import("node:fs")).readFileSync("<meetandplay-repo>/apps/web/scripts/mexico-footer/osm-places.json", "utf8");
  const byCoord = new Map<string, any>();
  const osm = new Map<string, any>(JSON.parse(raw).places.map((o: any) => { byCoord.set(`${o.lat.toFixed(5)},${o.lng.toFixed(5)}`, o); return [o.id, o]; }));
  const rows: any[] = [];
  let curated = 0, nonCore = 0;
  for (const st of states) {
    const mod: any = await import(`${R}/places/${st.slug}.ts`);
    for (const p of mod.PLACES) {
      if (p.source === "curated" || !/^(node|way|relation)\//.test(p.id)) { curated++; continue; }
      const o = osm.get(p.id) ?? byCoord.get(`${p.lat?.toFixed(5)},${p.lng?.toFixed(5)}`);
      if (!o) { curated++; continue; }
      const sports = SPORTS.filter((s) => o.sports.includes(s));
      if (!sports.length) { nonCore++; continue; }
      const cur: string[] = p.curated ?? [];
      const name = o.name ?? "";
      const courtsKnown = true;
      const courts = courtsKnown ? sports.reduce((a, s) => a + (o.courts?.[s] ?? 0), 0) : "";
      rows.push({
        name, state: st.name, state_slug: st.slug, city: cityName.get(p.city) ?? p.city,
        sports: sports.join(";"), courts: courts || "",
        courtsBy: courtsKnown ? Object.fromEntries(sports.filter((s) => o.courts?.[s]).map((s) => [s, o.courts[s]])) : {},
        lat: p.lat, lon: p.lng, osm_id: p.id, osm_url: `https://www.openstreetmap.org/${p.id}`,
        meetandplay_url: p.seeded ? "" : `https://meetandplay.mx/canchas/${p.city}/${p.slug}`,
      });
    }
  }
  rows.sort((a, b) => a.state.localeCompare(b.state) || a.city.localeCompare(b.city) || a.osm_id.localeCompare(b.osm_id));
  const cols = ["name","state","city","sports","courts","lat","lon","osm_id","osm_url","meetandplay_url"];
  writeFileSync("canchas-mexico.csv", [cols.join(","), ...rows.map((r) => cols.map((c) => q(r[c])).join(","))].join("\n") + "\n");
  writeFileSync("canchas-mexico.geojson", JSON.stringify({
    type: "FeatureCollection",
    attribution: "© OpenStreetMap contributors (ODbL 1.0) — compiled by MeetAndPlay, https://meetandplay.mx/canchas",
    features: rows.filter((r) => r.lat !== undefined).map((r) => ({
      type: "Feature", geometry: { type: "Point", coordinates: [r.lon, r.lat] },
      properties: { name: r.name || null, state: r.state, city: r.city, sports: r.sports.split(";"),
        courts: r.courts === "" ? null : r.courts, courts_by_sport: r.courtsBy, osm_id: r.osm_id, osm_url: r.osm_url, meetandplay_url: r.meetandplay_url || null },
    })),
  }) + "\n");
  const by = new Map<string, any>();
  for (const r of rows) {
    const e = by.get(r.state) ?? { state: r.state, places: 0, courts: 0, tennis: 0, padel: 0, pickleball: 0 };
    e.places++; e.courts += Number(r.courts || 0);
    for (const s of r.sports.split(";")) e[s]++;
    by.set(r.state, e);
  }
  const list = [...by.values()].sort((a, b) => b.places - a.places);
  const c2 = ["state","places","courts_known","tennis_places","padel_places","pickleball_places"];
  writeFileSync("por-estado.csv", [c2.join(","), ...list.map((e) => [q(e.state), e.places, e.courts, e.tennis, e.padel, e.pickleball].join(","))].join("\n") + "\n");
  const tot = (k: string) => list.reduce((a, e) => a + e[k], 0);
  console.log(JSON.stringify({ rows: rows.length, excludedCurated: curated, nonCore, states: list.length, cities: new Set(rows.map(r=>r.state+r.city)).size,
    tennis: tot("tennis"), padel: tot("padel"), pickleball: tot("pickleball"), courts: tot("courts"), named: rows.filter(r=>r.name).length, unknownCourts: rows.filter(r=>r.courts==="").length, noLat: rows.filter(r=>r.lat===undefined).length }));
};
main();
