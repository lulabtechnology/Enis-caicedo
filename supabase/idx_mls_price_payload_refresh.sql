-- Ejecutar en Supabase -> SQL Editor -> New query.
-- No crea tablas nuevas. Solo refresca el payload existente para que la web muestre
-- Código MLS/ACOBIR y respete el precio guardado en price_from.
-- Después de subir el código, vuelve a correr el workflow IDX Sync para capturar
-- posibles datos de agente de lista desde el CSV de ACOBIR.

update public.idx_listings
set
  payload = jsonb_set(
    jsonb_set(
      coalesce(payload, '{}'::jsonb),
      '{mlsCode}',
      to_jsonb(coalesce(nullif(payload->>'mlsCode', ''), unique_id)),
      true
    ),
    '{priceFrom}',
    to_jsonb(coalesce(nullif(price_from, ''), nullif(payload->>'priceFrom', ''), 'Consultar precio')),
    true
  ),
  updated_at = now()
where payload is not null;
