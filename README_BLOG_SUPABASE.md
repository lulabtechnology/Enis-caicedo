# Blog administrable - Supabase NUEVO separado del IDX

Este proyecto usa DOS proyectos Supabase distintos:

- IDX / propiedades: conserva las variables genericas `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, etc. NO CAMBIARLAS.
- Blog: usa exclusivamente las variables `NEXT_PUBLIC_BLOG_SUPABASE_*` y `BLOG_SUPABASE_*`.

Proyecto nuevo del blog mostrado por el cliente:

`https://nsjriyfebnwoovlkhga.supabase.co`

## 1. Crear usuario administrador EN EL SUPABASE NUEVO

1. Abra el proyecto `eniscaicedo123`.
2. Authentication > Users.
3. Add user > Create new user.
4. Email: `enislawpty@gmail.com`.
5. Defina una contraseña fuerte.
6. Si aparece Auto Confirm / Confirm email, deje el usuario confirmado.
7. No guarde la contraseña en GitHub ni en Vercel.

Si desea usar otro correo, cambie `enislawpty@gmail.com` dentro de `supabase/blog_module.sql` ANTES de ejecutar el SQL.

## 2. Ejecutar el SQL EN EL SUPABASE NUEVO

1. SQL Editor > New query.
2. Abra `supabase/blog_module.sql`.
3. Copie TODO el contenido.
4. Pegue el SQL y pulse Run.
5. Al final debe devolver 1 fila de `blog_admins` con `enislawpty@gmail.com`.

El SQL crea:

- `public.blog_posts`
- `public.blog_admins`
- RLS y permisos de lectura publica solo para articulos publicados
- bucket publico `blog-covers` (maximo 5 MB; JPG, PNG, WEBP, AVIF)

Si al final devuelve 0 filas, confirme primero que el usuario exista en Authentication > Users y ejecute nuevamente el SQL completo.

## 3. Configurar recuperacion de contraseña

Supabase nuevo > Authentication > URL Configuration:

- Site URL: `https://eniscaicedo.com`
- Redirect URL: `https://eniscaicedo.com/admin/blog/restablecer`
- Opcional local: `http://localhost:3000/admin/blog/restablecer`

## 4. Obtener las claves DEL SUPABASE NUEVO

Supabase nuevo > Project Settings > API Keys, o boton Connect.

Copie:

- Project URL
- Publishable key (`sb_publishable_...`)
- Secret key (`sb_secret_...`)

La Secret key nunca debe llevar prefijo `NEXT_PUBLIC_`.

## 5. Variables NUEVAS en Vercel

NO elimine ni modifique las variables Supabase existentes del IDX.

Agregue estas variables ADICIONALES:

```text
NEXT_PUBLIC_BLOG_SUPABASE_URL=https://nsjriyfebnwoovlkhga.supabase.co
NEXT_PUBLIC_BLOG_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
BLOG_SUPABASE_SECRET_KEY=sb_secret_...
NEXT_PUBLIC_SITE_URL=https://eniscaicedo.com
```

Si Supabase solo muestra claves legacy puede usar:

```text
NEXT_PUBLIC_BLOG_SUPABASE_ANON_KEY=eyJ...
BLOG_SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

No es necesario configurar ambos pares de claves.

## 6. Redeploy

Vercel > Deployments > ultimo deployment > ... > Redeploy.

## 7. Probar

- Login: `https://eniscaicedo.com/admin/blog/login`
- Panel: `https://eniscaicedo.com/admin/blog`
- Blog publico: `https://eniscaicedo.com/blog`

Prueba recomendada:

1. Crear articulo como borrador: no debe aparecer publicamente.
2. Cambiarlo a publicado: debe aparecer en `/blog`.
3. Subir portada: debe aparecer en Storage > `blog-covers` del Supabase NUEVO.
4. Editar y borrar el articulo.
5. Cambiar contraseña desde el panel.
6. Probar "Olvide mi contraseña" y comprobar que el enlace regrese a `/admin/blog/restablecer`.
