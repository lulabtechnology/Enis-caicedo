# Blog administrable - Enis Caicedo

Este incremental agrega:

- `/blog`: listado publico de articulos publicados.
- `/blog/[slug]`: pagina individual con metadata SEO/Open Graph.
- `/admin/blog/login`: login privado con Supabase Auth.
- `/admin/blog`: crear, editar, publicar/despublicar y borrar articulos; subir/reemplazar/quitar portada; cambiar contraseña.
- `/admin/blog/recuperar`: recuperacion de contraseña por correo.
- `/admin/blog/restablecer`: formulario abierto desde el enlace de recuperacion.
- Supabase Database + Storage para contenido y portadas.
- Autorizacion adicional por tabla privada `blog_admins`.

## Importante

El proyecto ya usa Supabase para IDX. Lo recomendado es reutilizar ESE MISMO proyecto de Supabase, no crear uno aparte, salvo que se quiera separar la infraestructura intencionalmente.

El SQL espera el administrador con correo `enislawpty@gmail.com`, que es el correo publico actual del sitio. La contraseña NO se guarda ni se hardcodea en GitHub: se define al crear el usuario en Supabase y despues puede cambiarse desde el panel.

## 1. Crear el usuario administrador

1. Abra Supabase Dashboard.
2. Entre al proyecto que ya usa Enis Caicedo para el IDX.
3. Menu izquierdo: **Authentication**.
4. Entre a **Users**.
5. Pulse **Add user**.
6. Cree el usuario con correo `enislawpty@gmail.com` y una contraseña fuerte.
7. Si aparece la opcion de confirmar automaticamente el usuario, dejelo confirmado para poder iniciar sesion inmediatamente.

Si se usa OTRO correo, abra `supabase/blog_module.sql` y sustituya `enislawpty@gmail.com` por ese correo antes de ejecutar el SQL.

## 2. Crear tablas, permisos y bucket

1. Supabase > **SQL Editor**.
2. Pulse **New query**.
3. Abra `supabase/blog_module.sql` de este incremental.
4. Copie TODO el archivo y peguelo en la consulta.
5. Pulse **Run**.
6. Al final debe aparecer una fila en el resultado de `blog_admins` con el correo del administrador.
7. Si no aparece ninguna fila, el usuario Auth no existia con ese correo al momento de ejecutar el SQL. Cree/corrija el usuario y vuelva a ejecutar el SQL completo; es idempotente.

El mismo SQL crea el bucket publico `blog-covers`, maximo 5 MB por archivo, con JPG/PNG/WEBP/AVIF.

## 3. Configurar recuperacion de contraseña

En Supabase:

1. **Authentication** > **URL Configuration**.
2. En **Site URL** use `https://eniscaicedo.com`.
3. En **Redirect URLs**, agregue `https://eniscaicedo.com/admin/blog/restablecer`.
4. Para desarrollo local puede agregar tambien `http://localhost:3000/admin/blog/restablecer`.
5. Guarde los cambios.

## 4. Variables de entorno en Vercel

Este incremental acepta las claves nuevas de Supabase y tambien las legacy para no romper el IDX existente.

Variables recomendadas nuevas:

```text
NEXT_PUBLIC_SITE_URL=https://eniscaicedo.com
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

Compatibilidad legacy existente:

```text
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

No es necesario configurar AMBOS pares. Si el proyecto ya tiene `NEXT_PUBLIC_SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` porque el IDX funciona con Supabase, puede conservarlos. El codigo soporta ambos formatos.

**Nunca** ponga `SUPABASE_SECRET_KEY` ni `SUPABASE_SERVICE_ROLE_KEY` con prefijo `NEXT_PUBLIC_`.

En Vercel: proyecto > **Settings** > **Environment Variables** > agregue cada variable > seleccione Production (y Preview si corresponde) > Save > redeploy.

## 5. Claves en Supabase

Supabase Dashboard > **Project Settings** > **API Keys**. En proyectos recientes puede usar Publishable key para navegador y Secret key para servidor. En proyectos legacy puede seguir usando anon/service_role mientras se hace la migracion.

La URL del proyecto tambien puede copiarse desde el dialogo **Connect** o desde la configuracion del proyecto.

## 6. Probar

Despues del deploy:

- Login: `https://eniscaicedo.com/admin/blog/login`
- Panel: `https://eniscaicedo.com/admin/blog`
- Blog publico: `https://eniscaicedo.com/blog`

Prueba recomendada:

1. Inicie sesion.
2. Cree un articulo como **Borrador** y confirme que NO aparece en `/blog`.
3. Edite el articulo, suba portada y cambie estado a **Publicado**.
4. Confirme que aparece en `/blog` y abre `/blog/slug-del-articulo`.
5. Reemplace la portada y guarde.
6. Cambie la contraseña desde **Seguridad**.
7. Cierre sesion y pruebe la nueva contraseña.
8. Pruebe **Olvide mi contraseña** para confirmar el correo y redirect de Supabase.

## Formato de contenido

El editor evita HTML crudo y renderiza un formato seguro y simple:

- `## Titulo` para subtitulo.
- `### Titulo` para subtitulo menor.
- `- elemento` para listas.
- `1. elemento` para listas numeradas.
- `**texto**` para negrita.
- `> texto` para cita destacada.
- `[texto](https://ejemplo.com)` para enlaces.

## Seguridad implementada

- No hay registro publico en la web.
- Login con Supabase Auth.
- Cada request CRUD valida el JWT con Supabase.
- Ademas valida el UUID contra `public.blog_admins`.
- Las escrituras DB/Storage usan exclusivamente Secret/Service Role desde rutas de servidor.
- El publico solo tiene SELECT RLS sobre posts publicados.
- El bucket de portada es publico solo para lectura de imagenes; el panel sube y borra desde el servidor.
- El admin tiene `robots: noindex, nofollow`.
