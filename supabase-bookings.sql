create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  "bookingReference" text not null unique,
  "fullName" text not null,
  email text not null,
  phone text not null,
  age text not null,
  sex text not null,
  occupation text not null,
  residence text not null,
  specialty text not null,
  "guardianName" text,
  "preferredDate" text not null,
  "timeSlot" text not null,
  format text not null,
  notes text,
  status text not null default 'Pending',
  "createdAt" timestamptz not null default now()
);

alter table public.bookings enable row level security;

drop policy if exists "Public can create bookings" on public.bookings;
create policy "Public can create bookings"
on public.bookings for insert
to anon
with check (true);

drop policy if exists "Admin can read bookings" on public.bookings;
create policy "Admin can read bookings"
on public.bookings for select
to anon
using (true);

drop policy if exists "Admin can update bookings" on public.bookings;
create policy "Admin can update bookings"
on public.bookings for update
to anon
using (true)
with check (true);

drop policy if exists "Admin can delete bookings" on public.bookings;
create policy "Admin can delete bookings"
on public.bookings for delete
to anon
using (true);

grant usage on schema public to anon;
grant select, insert, update, delete on public.bookings to anon;

do $$
begin
  alter publication supabase_realtime add table public.bookings;
exception
  when duplicate_object then null;
end $$;
