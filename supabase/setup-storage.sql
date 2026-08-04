-- Execute no SQL Editor do Supabase antes de usar o envio de fotos e histórico.
-- Em produção, substitua estas políticas por autenticação e regras mais restritas.
insert into storage.buckets (id, name, public)
values ('student-photos', 'student-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "demo allows photo upload" on storage.objects;
create policy "demo allows photo upload"
on storage.objects for insert to anon
with check (bucket_id = 'student-photos');

drop policy if exists "demo allows photo update" on storage.objects;
create policy "demo allows photo update"
on storage.objects for update to anon
using (bucket_id = 'student-photos')
with check (bucket_id = 'student-photos');

drop policy if exists "public can read student photos" on storage.objects;
create policy "public can read student photos"
on storage.objects for select to public
using (bucket_id = 'student-photos');

-- Histórico de acessos. Não armazene descriptors faciais nesta tabela.
create table if not exists public.access_logs (
  id uuid primary key,
  student_id uuid,
  student_name text not null,
  registration text,
  class_name text,
  occurred_at timestamptz not null,
  status text not null check (status in ('authorized', 'denied'))
);

alter table public.access_logs enable row level security;

drop policy if exists "demo can insert access logs" on public.access_logs;
create policy "demo can insert access logs"
on public.access_logs for insert to anon
with check (true);

drop policy if exists "demo can read access logs" on public.access_logs;
create policy "demo can read access logs"
on public.access_logs for select to anon
using (true);

drop policy if exists "demo can delete access logs" on public.access_logs;
create policy "demo can delete access logs"
on public.access_logs for delete to anon
using (true);
