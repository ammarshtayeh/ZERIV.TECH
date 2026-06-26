-- Supabase migration (for future use — currently using mock data)
-- Run this in Supabase SQL Editor when ready to connect

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service_type text,
  budget_range text,
  message text not null,
  created_at timestamp with time zone default now()
);

alter table contact_requests enable row level security;

create policy "Allow anonymous inserts"
  on contact_requests
  for insert
  to anon
  with check (true);

create policy "Allow authenticated read"
  on contact_requests
  for select
  to authenticated
  using (true);
