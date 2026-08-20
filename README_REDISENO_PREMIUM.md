# Rediseño premium — Enis Caicedo

Incremental construido sobre el ZIP más reciente entregado el 19 de agosto de 2026.

## Qué cambia

- Rediseño visual completo del front público manteniendo la identidad teal/verde, navy y acentos dorados.
- Nueva dirección tipográfica: Cormorant Garamond para titulares editoriales + Manrope para interfaz/cuerpo.
- Home replanteada con hero cinematográfico, bloques editoriales, bento de credenciales, proceso y CTA final.
- Header glass/sticky, footer premium y WhatsApp flotante renovado.
- Servicios legales, Bienes Raíces, Sobre Enis, Contacto, Propiedades y Blog adaptados al nuevo lenguaje visual.
- Artículos del blog con hero editorial y lectura más cuidada.
- GSAP + ScrollTrigger para reveals, stagger, parallax y progreso de lectura/scroll.
- Lenis para smooth scroll únicamente en desktop con puntero fino.
- `prefers-reduced-motion` respetado; en móvil/touch no se fuerza smooth scrolling.
- 14 imágenes principales de marketing convertidas a WebP. Los JPG originales se conservan como respaldo.

## Optimización de imágenes

Los 14 JPG de marketing usados en el rediseño sumaban aproximadamente 10.14 MB. Sus nuevas variantes WebP suman aproximadamente 0.92 MB (reducción aproximada del 90.9%).

No se modificaron las imágenes/datos propios del feed IDX para evitar afectar la lógica de propiedades.

## Animaciones

El archivo `components/site/ExperienceLayer.tsx` carga GSAP, ScrollTrigger y Lenis después de la interacción. El contenido y la navegación no dependen de esas librerías para funcionar: si no cargan, el sitio queda disponible sin movimiento avanzado.

CDN usados:

- GSAP 3.15.0
- ScrollTrigger 3.15.0
- Lenis 1.3.26

No se agregaron paquetes ni se modificaron `package.json` / `package-lock.json`.

## Seguridad / lógica preservada

Este incremental NO modifica:

- Variables de entorno.
- Supabase del IDX.
- Supabase separado del Blog.
- SQL.
- APIs del blog.
- Login/admin del blog.
- Importador IDX.
- `content/site.ts` ni `lib/idx/*`.
- Credenciales o secretos.

## Instalación

1. Descomprima este ZIP encima de la raíz actual del repositorio, preservando carpetas.
2. Suba los archivos a GitHub.
3. Deje que Vercel haga el deployment o ejecute Redeploy.
4. No agregue ni cambie variables de entorno para este rediseño.
5. Revise en desktop y móvil: Home, Servicios legales, Bienes raíces, Propiedades, detalle de propiedad, Blog, artículo, Sobre Enis y Contacto.

## Validación realizada

- Sintaxis TS/TSX de los archivos modificados: OK mediante TypeScript 5.8.3 `transpileModule`.
- Referencias estáticas de imágenes: 0 assets faltantes.
- Balance de llaves CSS: OK.
- Se verificó que `lib/idx`, `content/site.ts`, `app/api` y `lib/blog` no difieran de la base recibida.

No se ejecutó un `next build` completo en el contenedor porque el entorno de trabajo no tenía `node_modules` y no contó con acceso de red utilizable para reinstalar dependencias. Vercel debe ejecutar el build final como parte del deployment.
