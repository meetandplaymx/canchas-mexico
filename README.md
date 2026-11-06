# canchas-mexico

[![License: ODbL](https://img.shields.io/badge/license-ODbL%201.0-blue)](https://opendatacommons.org/licenses/odbl/1-0/) [![Data: OpenStreetMap](https://img.shields.io/badge/data-OpenStreetMap-7ebc6f)](https://www.openstreetmap.org/copyright) [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23986488.svg)](https://doi.org/10.5281/zenodo.23986488) [![Dataset hub](https://img.shields.io/badge/dataset-meetandplay.mx%2Fdatos-1f6feb)](https://meetandplay.mx/datos) [![Report](https://img.shields.io/badge/report-reporte--padel--mexico-orange)](https://meetandplay.mx/reporte-padel-mexico)

**Open dataset of padel, tennis and pickleball courts in Mexico, from OpenStreetMap.**
**Dataset abierto de canchas de pádel, tenis y pickleball en México, a partir de OpenStreetMap.**

Compiled by [MeetAndPlay](https://meetandplay.mx) · Browse it on a map: <https://meetandplay.mx/canchas> · Mirrors: [Zenodo (DOI)](https://doi.org/10.5281/zenodo.23986488) · [Kaggle](https://www.kaggle.com/datasets/dmitriiselikhov/padel-tennis-pickleball-courts-in-mexico) · Dataset hub: <https://meetandplay.mx/datos> · Analysis: <https://meetandplay.mx/reporte-padel-mexico>

## English

Every place mapped in OpenStreetMap (OSM) with at least one tennis, padel or pickleball court in Mexico, as of the OSM snapshot of **2026-09-25**.

| | |
|---|---|
| Places | **1,052** |
| States | 32 |
| Cities / municipalities | 255 |
| Places with tennis courts | 1,005 |
| Places with padel courts | 51 |
| Places with pickleball courts | 14 |
| Court features counted (those three sports) | 2,309 |
| Places with a name in OSM | 354 |

Note: OSM mappers sometimes draw one polygon over several courts, so `courts` is a **lower bound**. Padel and pickleball are under-mapped in OSM; this dataset reflects what is mapped, not every club that exists.

### Files

- `canchas-mexico.csv` - one row per place (UTF-8, RFC 4180).
- `canchas-mexico.geojson` - the same places as GeoJSON points (WGS84, `[lon, lat]`).
- `por-estado.csv` - places, known courts and places per sport, by state.
- `deportes-por-estado.csv` - padel, tennis and pickleball places per state (all 32 states, ranked), each sport's share and the leading sport. Spanish column names: `posicion`, `estado_slug`, `estado`, `lugares`, `lugares_padel`, `lugares_tenis`, `lugares_pickleball`, `porcentaje_*`, `deporte_lider` (`padel`, `tenis`, `pickleball`, `empate` = tie, `sin_datos` = no places). A place with two sports counts in both; shares are of the sport listings, not of places. Computed only from the rows of `canchas-mexico.csv`, with the same logic as the [racket-sports-by-state study](https://meetandplay.mx/datos/deportes-de-raqueta-por-estado) - but that study also counts researched non-OSM venues, so its published figures can be higher than this file's.
- `mapa-canchas-mexico.svg` - choropleth map of the 32 states: known courts (this dataset's `courts`, a lower bound) per 100,000 inhabitants, darker = more. Built only from the OSM rows above, so its values differ from the map on meetandplay.mx, which includes non-OSM venues. Spanish labels, light/dark aware, `<title>` per state.

### Columns

| Column | Meaning |
|---|---|
| `name` | OSM `name`. Empty = unnamed in OSM |
| `state` | State (estado) |
| `city` | City / locality |
| `sports` | `;`-separated: `tennis`, `padel`, `pickleball` |
| `courts` | Court features for those sports. Empty = OSM does not say |
| `lat`, `lon` | WGS84 coordinates |
| `osm_id` | OSM element, e.g. `way/554749662` |
| `osm_url` | `https://www.openstreetmap.org/<osm_id>` |
| `meetandplay_url` | The place's page on MeetAndPlay (empty when it has none) |

No phone numbers, e-mail addresses or other personal data are included. Venues that come from sources other than OpenStreetMap are deliberately **not** part of this dataset.

## Español (México)

Todos los lugares mapeados en OpenStreetMap (OSM) con al menos una cancha de tenis, pádel o pickleball en México, según la copia de OSM del **25 de septiembre de 2026**: 1,052 lugares en 32 estados y 255 ciudades (1,005 con tenis, 51 con pádel, 14 con pickleball).

`courts` es un **mínimo**: a veces un solo polígono en OSM cubre varias canchas. El pádel y el pickleball están poco mapeados en OSM, así que esto refleja lo mapeado, no todos los clubes que existen. Las columnas son las de la tabla de arriba; `name` vacío significa que el lugar no tiene nombre en OSM y `courts` vacío que OSM no indica cuántas canchas hay. No se incluyen teléfonos ni datos personales.

## Map credits

State outlines: [Natural Earth](https://www.naturalearthdata.com/) (public domain). Courts: © OpenStreetMap contributors (ODbL 1.0). Population: INEGI, Censo de Población y Vivienda 2020 (used under INEGI's open-use terms). The map and `deportes-por-estado.csv` are derived from the OSM data, so they are shared under ODbL with the attribution below; the map must keep the credit line printed on it.

## License / Licencia

Data: [Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/1-0/) - see [LICENSE](LICENSE).

**Attribution required / Atribución obligatoria:**

> © OpenStreetMap contributors. Fuente/Source: MeetAndPlay - https://meetandplay.mx/canchas

If you adapt the data and publish the result, you must keep it under ODbL (share-alike) and keep this attribution. Details: <https://www.openstreetmap.org/copyright>.

## How to cite / Cómo citar

> MeetAndPlay (2026). *Canchas de pádel, tenis y pickleball en México (datos de OpenStreetMap)* [dataset]. https://github.com/idimetrix/canchas-mexico. Data © OpenStreetMap contributors, ODbL 1.0.

A machine-readable [CITATION.cff](CITATION.cff) is included (GitHub shows a "Cite this repository" button).

## Updates / Actualización

Refreshed from a new OSM snapshot about once a quarter (next: early 2027). The snapshot date is the one above. Found a wrong or missing court? Fix it in [OpenStreetMap](https://www.openstreetmap.org) and it will flow into the next release, or tell us at <https://meetandplay.mx/canchas>.

## Regenerating

The CSV and GeoJSON are exported from the MeetAndPlay directory data (itself generated from an OSM Overpass pull). Only OSM-derived rows are exported.
