# IDX local cache

Este directorio guarda la data normalizada del feed IDX de ACOBIR.

- `listings.json`: propiedades normalizadas para la web.
- `headers/`: archivos `<prefix>_headers.csv` descargados del FTP para mapear columnas.

Mientras no exista base de datos, el script `npm run idx:import` escribe aquí la data para que Next.js la pueda mostrar en `/propiedades` y `/propiedades/[id]`.
