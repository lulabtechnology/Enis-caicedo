# Integración IDX ACOBIR / RealtyServer

Esta versión deja la web preparada para IDX sin base de datos todavía.

## Qué se agregó

- Script de importación: `scripts/import-idx.ts`
- Normalizador de CSV IDX: `lib/idx/normalize.ts`
- Generador de URLs y rutas locales de fotos: `lib/idx/photos.ts`
- Cache local de propiedades: `data/idx/listings.json`
- API interna: `/api/idx`
- Página de propiedades preparada para usar IDX si existe data.
- Páginas SEO individuales: `/propiedades/[id]`
- Página faltante: `/terminos`

## Flujo actual sin base de datos

```txt
FTP RealtyServer -> CSV IDX -> npm run idx:import -> data/idx/listings.json -> Next.js/Vercel
                       -> fotos descargadas -> public/idx/photos
```

El manual indica que las fotos no deben mostrarse con hotlink directo desde RealtyServer. Por eso el script descarga las fotos a `public/idx/photos` y la web usa esas rutas locales.

## Variables necesarias

Copie `.env.example` a `.env.local` y complete:

```txt
IDX_FTP_HOST=ftp.realtyserver.com
IDX_FTP_USER=usuario_real
IDX_FTP_PASSWORD=password_real
IDX_FTP_SECURE=false
IDX_FEEDS=res,com
IDX_DOWNLOAD_PHOTOS=true
IDX_MAX_PHOTOS_PER_LISTING=12
```

## Comandos

Importar data y fotos:

```bash
npm run idx:import
```

Importar solo data, sin fotos:

```bash
npm run idx:import:no-photos
```

Probar compilación:

```bash
npm run build
```

## Cuando conectemos DB / storage

Después se cambia el destino de `scripts/import-idx.ts` para escribir en Supabase, Neon, PlanetScale o el servicio que se defina. La normalización y la estructura visual ya quedan listas.
