-- Ejecutar en Supabase -> SQL Editor -> New query.
-- Tabla principal para propiedades IDX ACOBIR.

create table if not exists public.idx_listings (
  id text primary key,
  unique_id text not null,
  feed_type text not null check (feed_type in ('res', 'com')),
  title text not null,
  building text,
  price_from text,
  location text,
  property_type text,
  operation text,
  image text,
  listing_photo_count integer default 0,
  payload jsonb not null,
  raw jsonb,
  imported_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_listings_feed_type_idx on public.idx_listings(feed_type);
create index if not exists idx_listings_unique_id_idx on public.idx_listings(unique_id);
create index if not exists idx_listings_updated_at_idx on public.idx_listings(updated_at desc);
create index if not exists idx_listings_payload_gin_idx on public.idx_listings using gin(payload);

alter table public.idx_listings enable row level security;

drop policy if exists "idx_listings_public_read" on public.idx_listings;
create policy "idx_listings_public_read"
  on public.idx_listings
  for select
  to anon, authenticated
  using (true);

-- Bucket público para fotos IDX.
-- También puedes crearlo desde Storage -> New bucket:
-- Name: idx-photos, Public bucket: ON.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('idx-photos', 'idx-photos', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "idx_photos_public_read" on storage.objects;
create policy "idx_photos_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'idx-photos');
