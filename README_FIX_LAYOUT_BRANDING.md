# FIX Layout + Branding + WhatsApp — Enis Caicedo

Base usada: `Enis-caicedo-main (10)(1).zip`.

## Qué corrige

- Corrimiento progresivo hacia la izquierda / franja oscura a la derecha al recargar con Ctrl+R.
- Bloqueo real del overflow horizontal en `html`, `body` y `main`.
- Reset exclusivo del eje X al cargar/restaurar la página para evitar que Chrome reabra un `scrollLeft` previo.
- Se retira Lenis de esta fase para eliminar una capa de scroll suave mientras se estabiliza el layout. GSAP + ScrollTrigger permanecen.
- Elementos decorativos que sobresalían del viewport quedan recortados o reposicionados.
- Botones principales dejan de terminar en un tono casi negro y ganan contraste/hover consistente.
- Se corrigen utilidades Tailwind de opacidad no estándar que podían no generar CSS y dejar texto/overlays con color heredado incorrecto.
- WhatsApp usa un glyph real reconocible en header, hero, formulario, propiedades y botón flotante.
- El botón flotante vuelve al verde reconocido de WhatsApp.
- Se restaura y hace visible el crédito/backlink: `Desarrollado por LuLabTech · lulabtech.com`.
- Header y footer usan el logo original de Enis con fondo transparente.

## Por qué ocurría el corrimiento al recargar

Había elementos visuales que podían extender el ancho renderizado fuera del viewport (decoraciones con offsets negativos y elementos transformados/parallax). El `body` tenía `overflow-x: clip`, pero la raíz `html` podía seguir conservando overflow horizontal. Chrome puede restaurar también la posición horizontal al recargar, así que al hacer Ctrl+R podía volver a un `scrollLeft` distinto de cero. Como el fondo de `html` era oscuro, aparecía una franja negra a la derecha y el contenido parecía irse desplazando cada vez más a la izquierda.

La corrección actúa en las dos partes: elimina/recorta el overflow de raíz y fuerza el eje X a cero al cargar, sin alterar la posición vertical.

## Logo

`public/images/brand/logo-transparent.png` se obtiene del logo original existente. No se rediseñó ni se sustituyó la marca; solo se elimina el fondo blanco de página y se conserva la casa blanca del isotipo.

## Instalación

Copiar el contenido de este ZIP encima del proyecto actual respetando exactamente las rutas y hacer un nuevo deployment en Vercel.

No requiere SQL, cambios de Supabase ni variables nuevas.
