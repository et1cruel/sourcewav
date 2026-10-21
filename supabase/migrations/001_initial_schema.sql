-- ============================================
-- UNDERGROUND CULTURE HUB — Initial Database Schema
-- Phase 0/1/2: Accounts, Profiles, Community, Artists, Events, Venues
-- ============================================

-- Enable extensions
create extension if not exists "uuid-ossp";

-- ===== Accounts & Profiles =====
create table profiles (
  id uuid references auth.users not null primary key,
  username text unique not null check (length(username) >= 3),
  display_name text not null,
  bio text,
  avatar_url text,
  cover_url text,
  location text,
  province text,
  region text,
  skills text[] default '{}',
  social_links jsonb default '{}',
  availability text check (availability in ('available','open_for_collab','not_available')),
  is_verified boolean default false,
  is_suspended boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table user_roles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  role text not null check (role in ('member','artist','organizer','venue_owner','seller','moderator','admin')),
  created_at timestamptz default now(),
  unique (user_id, role)
);

create table artist_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null unique,
  stage_name text,
  artist_type text[] default '{}',
  genres text[] default '{}',
  bio text,
  portfolio_count integer default 0,
  followers_count integer default 0,
  following_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table follows (
  id uuid default uuid_generate_v4() primary key,
  follower_id uuid references auth.users not null,
  following_id uuid references auth.users not null,
  created_at timestamptz default now(),
  unique (follower_id, following_id),
  check (follower_id <> following_id)
);

create table blocks (
  id uuid default uuid_generate_v4() primary key,
  blocker_id uuid references auth.users not null,
  blocked_id uuid references auth.users not null,
  created_at timestamptz default now(),
  unique (blocker_id, blocked_id)
);

-- ===== Community =====
create table posts (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references auth.users not null,
  content text,
  media text[] default '{}',
  embed_url text,
  embed_platform text check (embed_platform in ('youtube','spotify','soundcloud')),
  link_url text,
  link_title text,
  link_preview text,
  status text default 'published' check (status in ('published','hidden','removed')),
  like_count integer default 0,
  comment_count integer default 0,
  bookmark_count integer default 0,
  share_count integer default 0,
  moderation_reason text,
  moderated_at timestamptz,
  moderated_by uuid references auth.users,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table post_media (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts on delete cascade not null,
  url text not null,
  type text check (type in ('image','video')),
  sort_order integer default 0
);

create table comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts on delete cascade not null,
  author_id uuid references auth.users not null,
  parent_id uuid references comments on delete cascade,
  content text not null,
  status text default 'published' check (status in ('published','hidden','removed')),
  like_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table post_likes (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts on delete cascade not null,
  user_id uuid references auth.users not null,
  created_at timestamptz default now(),
  unique (post_id, user_id)
);

create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  post_id uuid references posts on delete cascade,
  portfolio_id uuid references portfolio_items on delete cascade,
  created_at timestamptz default now(),
  check ((post_id is not null) <> (portfolio_id is not null))
);

create table tags (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  category text default 'general' check (category in ('music','art','event','general')),
  created_at timestamptz default now()
);

create table post_tags (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references posts on delete cascade not null,
  tag_id uuid references tags on delete cascade not null,
  unique (post_id, tag_id)
);

-- ===== Artist Portfolio =====
create table portfolio_items (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  type text not null,

-- ===== Events & Venues =====
create table venues (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references auth.users,
  name text not null,
  description text,
  venue_type text,
  address text,
  province text,
  region text,
  latitude double precision,
  longitude double precision,
  image_url text,
  capacity integer,
  indoor_outdoor text check (indoor_outdoor in ('indoor','outdoor','both')),
  equipment text[] default '{}',
  price_range text,
  opening_hours jsonb default '{}',
  terms text,
  contact_phone text,
  contact_email text,
  website text,
  social_links jsonb default '{}',
  verification_status text default 'pending' check (verification_status in ('pending','verified','rejected')),
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table venue_amenities (
  id uuid default uuid_generate_v4() primary key,
  venue_id uuid references venues on delete cascade not null,
  name text not null
);

create table venue_submissions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  status text default 'pending' check (status in ('pending','approved','rejected')),
  venue_id uuid references venues,
  created_at timestamptz default now()
);

create table event_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  color text,
  created_at timestamptz default now()
);

create table events (
  id uuid default uuid_generate_v4() primary key,
  organizer_id uuid references auth.users not null,
  venue_id uuid references venues,
  title text not null,
  slug text unique not null,
  description text,
  cover_image text,
  category_id uuid references event_categories,
  start_at timestamptz not null,
  end_at timestamptz not null,
  doors_open_at timestamptz,
  age_requirement integer,
  contact_info text,
  cancellation_policy text,
  status text default 'draft' check (status in ('draft','scheduled','live','completed','cancelled')),
  published boolean default false,
  allow_resale boolean default false,
  max_resale_price_percent integer,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table event_artists (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events on delete cascade not null,
  artist_id uuid references auth.users not null,
  role text,
  sort_order integer default 0
);

create table event_announcements (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events on delete cascade not null,
  title text not null,
  content text not null,
  published_at timestamptz default now()
);
  media text[] default '{}',
  external_links jsonb default '{}',
  tools text[] default '{}',
  credits text,
  published_at timestamptz,
  visibility text default 'public' check (visibility in ('public','unlisted','private')),
  tags text[] default '{}',
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ===== Ticketing & Payments =====
create table ticket_types (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events on delete cascade not null,
  name text not null,
  description text,
  price_cents integer not null default 0,
  currency text default 'THB',
  total_quantity integer not null default 0,
  sold_quantity integer default 0,
  reserved_quantity integer default 0,
  sale_start_at timestamptz,
  sale_end_at timestamptz,
  max_per_order integer,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table ticket_orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  event_id uuid references events on delete cascade not null,
  status text default 'pending' check (status in ('pending','paid','failed','expired','refunded','cancelled')),
  total_cents integer not null default 0,
  currency text default 'THB',
  payment_status text default 'pending' check (payment_status in ('pending','paid','failed','expired','refund_pending','refunded')),
  payment_reference text,
  paid_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table ticket_order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references ticket_orders on delete cascade not null,
  ticket_type_id uuid references ticket_types on delete cascade not null,
  quantity integer not null default 1,
  price_cents integer not null default 0
);

create table tickets (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references ticket_orders on delete cascade not null,
  order_item_id uuid references ticket_order_items on delete cascade not null,
  user_id uuid references auth.users not null,
  event_id uuid references events on delete cascade not null,
  ticket_type_id uuid references ticket_types on delete cascade not null,
  qr_token text unique not null,
  status text default 'valid' check (status in ('valid','used','cancelled','refunded','transferred')),
  owner_id uuid references auth.users not null,
  checked_in_at timestamptz,
  checked_in_by uuid references auth.users,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table ticket_resale_listings (
  id uuid default uuid_generate_v4() primary key,
  ticket_id uuid references tickets on delete cascade not null,
  seller_id uuid references auth.users not null,
  price_cents integer not null default 0,
  status text default 'available' check (status in ('available','reserved','sold','cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table ticket_transfers (
  id uuid default uuid_generate_v4() primary key,
  ticket_id uuid references tickets on delete cascade not null,
  from_user_id uuid references auth.users not null,
  to_user_id uuid references auth.users not null,
  status text default 'pending' check (status in ('pending','completed','cancelled')),
  created_at timestamptz default now()
);

create table payments (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references ticket_orders on delete cascade not null,
  user_id uuid references auth.users not null,
  amount_cents integer not null default 0,
  currency text default 'THB',
  status text default 'pending' check (status in ('pending','paid','failed','expired','refunded')),
  provider text not null,
  provider_payment_id text,
  reference text not null,
  dynamic_qr_data jsonb,
  paid_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table payment_webhook_events (
  id uuid default uuid_generate_v4() primary key,
  payment_id uuid references payments on delete cascade not null,
  provider text not null,
  event_type text not null,
  payload jsonb not null,
  processed boolean default false,
  created_at timestamptz default now()
);

create table refund_requests (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references ticket_orders on delete cascade not null,
  user_id uuid references auth.users not null,
  amount_cents integer not null default 0,
  reason text not null,
  status text default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references auth.users,
  reviewed_at timestamptz,
  created_at timestamptz default now()
);

create table ticket_checkins (
  id uuid default uuid_generate_v4() primary key,
  ticket_id uuid references tickets on delete cascade not null,
  event_id uuid references events on delete cascade not null,
  checked_in_by uuid references auth.users not null,
  checked_in_at timestamptz default now()
);