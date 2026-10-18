-- Private recruitment admin access.
-- Apply this migration in Supabase only after reviewing it in a staging project.

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

-- Roles are assigned by a trusted database operator, never by normal clients.
revoke all on table public.user_roles from anon, authenticated;
grant select on table public.user_roles to authenticated;

drop policy if exists "Users can read their own role" on public.user_roles;
create policy "Users can read their own role"
  on public.user_roles
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_roles ur
    where ur.user_id = (select auth.uid())
      and ur.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
revoke all on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;

-- The public application form needs INSERT only. RLS still governs row access.
revoke all on table public.applications from anon, authenticated;
grant insert on table public.applications to anon, authenticated;

-- Authenticated admins may read applications and update application status/details.
grant select, update on table public.applications to authenticated;

drop policy if exists "Admins can read applications" on public.applications;
create policy "Admins can read applications"
  on public.applications
  for select
  to authenticated
  using ((select public.is_admin()));

drop policy if exists "Admins can update applications" on public.applications;
create policy "Admins can update applications"
  on public.applications
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- Ensure public submissions remain available.
drop policy if exists "Enable public inserts for applications" on public.applications;
create policy "Enable public inserts for applications"
  on public.applications
  for insert
  to public
  with check (true);
