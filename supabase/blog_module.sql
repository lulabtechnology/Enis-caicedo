-- BLOG ENIS CAICEDO - Supabase
-- IMPORTANTE: este SQL debe ejecutarse en el proyecto NUEVO exclusivo del blog (eniscaicedo123).
-- NO ejecutarlo en la base de datos antigua del IDX.
-- Ejecutar DESPUES de crear el usuario administrador en Authentication > Users.
-- El usuario administrador esperado por este script es: enislawpty@gmail.com
-- Si se usara otro correo, cambie SOLO esa direccion en el bloque "Registrar administrador".

create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null,
  cover_url text,
  cover_path text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_idx
  on public.blog_posts(status, published_at desc);
create index if not exists blog_posts_updated_idx
  on public.blog_posts(updated_at desc);

create table if not exists public.blog_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

-- Mantener updated_at automaticamente tambien si una edicion se hace fuera del panel.
create or replace function public.blog_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_touch_updated_at on public.blog_posts;
create trigger blog_posts_touch_updated_at
before update on public.blog_posts
for each row execute function public.blog_touch_updated_at();

-- Seguridad de tablas.
alter table public.blog_posts enable row level security;
alter table public.blog_admins enable row level security;

revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon, authenticated;
grant all on public.blog_posts to service_role;

revoke all on public.blog_admins from anon, authenticated;
grant all on public.blog_admins to service_role;

-- El sitio publico SOLO puede ver articulos publicados.
drop policy if exists "blog_posts_public_read_published" on public.blog_posts;
create policy "blog_posts_public_read_published"
  on public.blog_posts
  for select
  to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());

-- No se crean policies publicas de INSERT/UPDATE/DELETE.
-- El CRUD administrativo pasa por rutas servidor Next.js y usa la Secret/Service Role key.

-- Bucket publico para portadas. Las escrituras se hacen SOLO desde el servidor.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog-covers',
  'blog-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Registrar administrador por UUID usando el usuario creado en Supabase Auth.
insert into public.blog_admins (user_id, email)
select id, email
from auth.users
where lower(email) = lower('enislawpty@gmail.com')
on conflict (user_id) do update set email = excluded.email;

-- Verificacion rapida al final: debe devolver 1 fila para el administrador.
select user_id, email, created_at
from public.blog_admins
order by created_at desc;
