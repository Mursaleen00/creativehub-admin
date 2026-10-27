create table if not exists store_matrix (
  id bigint generated always as identity primary key,
  app_key text not null,
  store text not null check (store in ('chrome','edge','firefox','opera')),
  status text not null default 'Draft',
  live_version text,
  monorepo_version text,
  store_url text,
  permission_justification text,
  firefox_source_bundle_status text,
  updated_at timestamptz default now(),
  unique(app_key, store)
);
create table if not exists remote_control (
  app_key text primary key,
  active boolean default true,
  announcement jsonb,
  promo jsonb,
  kill_switch boolean default false,
  kill_until timestamptz,
  free_limit_override integer,
  updated_at timestamptz default now()
);
create table if not exists lemon_orders (
  id text primary key,
  app_key text,
  product_id bigint,
  gross_cents integer,
  refunded_cents integer default 0,
  status text,
  created_at timestamptz
);
create table if not exists early_tester_keys (
  license_key_hash text primary key,
  app_key text,
  note text,
  issued_at timestamptz default now()
);
create table if not exists feedback (
  id bigint generated always as identity primary key,
  app_key text,
  browser text,
  type text check (type in ('Bug Report','Feature Request','Setup Help')),
  message text not null,
  created_at timestamptz default now()
);
