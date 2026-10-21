-- ============================================
-- UNDERGROUND CULTURE HUB — Row Level Security Policies
-- ============================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table artist_profiles enable row level security;
alter table follows enable row level security;
alter table blocks enable row level security;
alter table posts enable row level security;
alter table post_media enable row level security;
alter table comments enable row level security;
alter table post_likes enable row level security;
alter table bookmarks enable row level security;
alter table portfolio_items enable row level security;
alter table venues enable row level security;
alter table events enable row level security;
alter table ticket_types enable row level security;
alter table ticket_orders enable row level security;
alter table tickets enable row level security;
alter table payments enable row level security;
alter table marketplace_listings enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;
alter table notifications enable row level security;

-- Profiles: public read, own write
create policy "Profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Artist profiles: public read
create policy "Artist profiles are viewable by everyone" on artist_profiles for select using (true);

-- Follows: public read, own write
create policy "Follows are viewable by everyone" on follows for select using (true);
create policy "Users can manage own follows" on follows for all using (auth.uid() = follower_id);

-- Blocks: own write only
create policy "Users can manage own blocks" on blocks for all using (auth.uid() = blocker_id);

-- Posts: public read published, authors manage own
create policy "Published posts are viewable by everyone" on posts for select using (status = 'published');
create policy "Authors can manage own posts" on posts for all using (auth.uid() = author_id);

-- Post media: public read
create policy "Post media is viewable by everyone" on post_media for select using (true);

-- Comments: public read published, authors manage own
create policy "Published comments are viewable by everyone" on comments for select using (status = 'published');
create policy "Authors can manage own comments" on comments for all using (auth.uid() = author_id);

-- Post likes: public read, own write
create policy "Post likes are viewable by everyone" on post_likes for select using (true);
create policy "Users can manage own post likes" on post_likes for all using (auth.uid() = user_id);

-- Bookmarks: own read/write
create policy "Users can manage own bookmarks" on bookmarks for all using (auth.uid() = user_id);

-- Portfolio: public read public/unlisted, owners manage own
create policy "Public portfolio items are viewable by everyone" on portfolio_items for select using (visibility in ('public','unlisted'));
create policy "Owners can manage own portfolio items" on portfolio_items for all using (auth.uid() = user_id);

-- Venues: public read active/verified
create policy "Verified venues are viewable by everyone" on venues for select using (verification_status = 'verified' and is_active = true);
create policy "Owners can manage own venues" on venues for all using (auth.uid() = owner_id);

-- Events: public read published scheduled+
create policy "Published events are viewable by everyone" on events for select using (published = true and status in ('scheduled','live','completed'));
create policy "Organizers can manage own events" on events for all using (auth.uid() = organizer_id);

-- Ticket types: public read active
create policy "Active ticket types are viewable by everyone" on ticket_types for select using (is_active = true);

-- Ticket orders: own read
create policy "Users can read own ticket orders" on ticket_orders for select using (auth.uid() = user_id);

-- Tickets: own read, organizers manage event tickets
create policy "Users can read own tickets" on tickets for select using (auth.uid() = user_id or auth.uid() = owner_id);

-- Payments: own read
create policy "Users can read own payments" on payments for select using (auth.uid() = user_id);

-- Marketplace listings: public read available
create policy "Available listings are viewable by everyone" on marketplace_listings for select using (status = 'available');
create policy "Sellers can manage own listings" on marketplace_listings for all using (auth.uid() = seller_id);

-- Conversations: members read
create policy "Conversation members can read" on conversations for select using (
  exists (select 1 from conversation_members cm where cm.conversation_id = id and cm.user_id = auth.uid())
);

-- Messages: conversation members read
create policy "Conversation members can read messages" on messages for select using (
  exists (select 1 from conversation_members cm where cm.conversation_id = conversation_id and cm.user_id = auth.uid())
);
create policy "Members can insert messages to own conversations" on messages for insert with check (
  exists (select 1 from conversation_members cm where cm.conversation_id = conversation_id and cm.user_id = auth.uid() = sender_id)
);

-- Notifications: own read
create policy "Users can read own notifications" on notifications for select using (auth.uid() = user_id);