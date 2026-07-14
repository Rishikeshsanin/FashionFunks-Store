create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('Women', 'Men', 'Unisex', 'Kids', 'Babies')),
  subcategory text not null,
  description text not null,
  price_inr integer not null check (price_inr >= 0),
  compare_at_price_inr integer check (compare_at_price_inr is null or compare_at_price_inr > price_inr),
  image_path text not null,
  colors text[] not null default '{}',
  sizes text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.wishlist_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null check (char_length(customer_name) between 2 and 80),
  customer_email text not null,
  subtotal_inr integer not null check (subtotal_inr >= 0),
  discount_inr integer not null default 0 check (discount_inr >= 0),
  delivery_inr integer not null default 0 check (delivery_inr >= 0),
  total_inr integer not null check (total_inr >= 0),
  status text not null default 'demo_confirmed' check (status in ('demo_confirmed')),
  created_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  size text not null,
  color text not null,
  unit_price_inr integer not null check (unit_price_inr >= 0),
  quantity integer not null check (quantity between 1 and 10)
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(email)),
  created_at timestamptz not null default now()
);

create index products_category_idx on public.products(category) where active;
create index orders_user_created_idx on public.orders(user_id, created_at desc);
create index order_items_order_idx on public.order_items(order_id);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.wishlist_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "Active products are publicly readable"
  on public.products for select
  using (active = true);

create policy "Users read their profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

create policy "Users update their profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "Users manage their wishlist"
  on public.wishlist_items for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users read their orders"
  on public.orders for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users create their orders"
  on public.orders for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users read their order lines"
  on public.order_items for select to authenticated
  using (exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = (select auth.uid())
  ));

create policy "Anyone can join the newsletter"
  on public.newsletter_subscribers for insert to anon, authenticated
  with check (char_length(email) between 5 and 254);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
