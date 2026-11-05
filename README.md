# canchas-mexico

[![License: ODbL](https://img.shields.io/badge/license-ODbL%201.0-blue)](https://opendatacommons.org/licenses/odbl/1-0/) [![Data: OpenStreetMap](https://img.shields.io/badge/data-OpenStreetMap-7ebc6f)](https://www.openstreetmap.org/copyright) [![Dataset hub](https://img.shields.io/badge/dataset-meetandplay.mx%2Fdatos-1f6feb)](https://meetandplay.mx/datos) [![Report](https://img.shields.io/badge/report-reporte--padel--mexico-orange)](https://meetandplay.mx/reporte-padel-mexico)

**Open dataset of padel, tennis and pickleball courts in Mexico, from OpenStreetMap.**
**Dataset abierto de canchas de pádel, tenis y pickleball en México, a partir de OpenStreetMap.**

Compiled by [MeetAndPlay](https://meetandplay.mx) · Browse it on a map: <https://meetandplay.mx/canchas> · Dataset hub: <https://meetandplay.mx/datos> · Analysis: <https://meetandplay.mx/reporte-padel-mexico>

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
