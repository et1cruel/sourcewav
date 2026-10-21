-- ============================================
-- UNDERGROUND CULTURE HUB — Schema Part 2
-- Marketplace, Chat, Notifications, News, Collaboration, Administration
-- ============================================

-- ===== Art Marketplace =====
create table marketplace_listings (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references auth.users not null,
  title text not null,
  description text,
  category text not null,
  price_cents integer not null default 0,
  currency text default 'THB',
  quantity integer not null default 1,
  sold_quantity integer default 0,
  status text default 'available' check (status in ('available','reserved','sold','unavailable')),
  condition text,
  shipping_info text,
  rights_info text,
  refund_policy text,
  media text[] default '{}',
  digital_file_url text,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table listing_media (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references marketplace_listings on delete cascade not null,
  url text not null,
  type text check (type in ('image','video')),
  sort_order integer default 0
);

create table marketplace_orders (
  id uuid default uuid_generate_v4() primary key,
  buyer_id uuid references auth.users not null,
  listing_id uuid references marketplace_listings on delete cascade not null,
  quantity integer not null default 1,
  total_cents integer not null default 0,
  currency text default 'THB',
  status text default 'pending' check (status in ('pending','paid','failed','cancelled','refunded')),
  payment_status text default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  shipping_address jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table shipments (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references marketplace_orders on delete cascade not null,
  tracking_number text,
  carrier text,
  status text default 'pending' check (status in ('pending','shipped','delivered','returned')),
  created_at timestamptz default now()
);

create table digital_asset_access (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references marketplace_orders on delete cascade not null,
  user_id uuid references auth.users not null,
  file_url text,
  access_expires_at timestamptz,
  download_count integer default 0,
  created_at timestamptz default now()
);

-- ===== Chat & Notifications =====
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  type text default 'direct' check (type in ('direct','group')),
  name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table conversation_members (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations on delete cascade not null,
  user_id uuid references auth.users not null,
  joined_at timestamptz default now(),
  last_read_at timestamptz
);

create table messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations on delete cascade not null,
  sender_id uuid references auth.users not null,
  content text not null,
  status text default 'sent' check (status in ('sending','sent','delivered','read')),
  created_at timestamptz default now()
);

create table message_attachments (
  id uuid default uuid_generate_v4() primary key,
  message_id uuid references messages on delete cascade not null,
  url text not null,
  type text not null,
  file_size integer not null
);

create table notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  type text not null,
  title text not null,
  content text,
  link text,
  is_read boolean default false,
  created_at timestamptz default now()
);

create table notification_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  type text not null,
  enabled boolean default true,
  created_at timestamptz default now()
);

-- ===== News & Collaboration =====
create table news_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

create table news_articles (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references auth.users not null,
  category_id uuid references news_categories,
  title text not null,
  slug text unique not null,
  cover_image text,
  content text not null,
  status text default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table collaboration_posts (
  id uuid default uuid_generate_v4() primary key,
  author_id uuid references auth.users not null,
  title text not null,
  description text not null,
  job_type text not null,
  compensation text,
  compensation_type text check (compensation_type in ('paid','exchange','volunteer')),
  deadline timestamptz,
  contact_info text,
  status text default 'open' check (status in ('open','filled','closed')),
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table collaboration_applications (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references collaboration_posts on delete cascade not null,
  applicant_id uuid references auth.users not null,
  message text,
  status text default 'pending' check (status in ('pending','accepted','rejected')),
  created_at timestamptz default now()
);

-- ===== Administration =====
create table reports (
  id uuid default uuid_generate_v4() primary key,
  reporter_id uuid references auth.users not null,
  target_type text not null check (target_type in ('post','comment','user','conversation','message','listing','event')),
  target_id uuid not null,
  reason text not null,
  status text default 'pending' check (status in ('pending','reviewed','resolved','dismissed')),
  created_at timestamptz default now()
);

create table moderation_actions (
  id uuid default uuid_generate_v4() primary key,
  actor_id uuid references auth.users not null,
  target_type text not null,
  target_id uuid not null,
  action text not null check (action in ('hide','remove','block_user','unblock_user','suspend','unsuspend')),
  reason text,
  created_at timestamptz default now()
);

create table audit_logs (
  id uuid default uuid_generate_v4() primary key,
  actor_id uuid references auth.users,
  action text not null,
  entity_type text not null,
  entity_id uuid not null,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  created_at timestamptz default now()
);

create table platform_settings (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value jsonb not null default '{}',
  updated_by uuid references auth.users,
  updated_at timestamptz default now()
);