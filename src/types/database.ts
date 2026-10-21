/**
 * Database type definitions for UNDERGROUND CULTURE HUB.
 * Mirrors the PostgreSQL schema defined in supabase/migrations.
 */

export type Role = 'member' | 'artist' | 'organizer' | 'venue_owner' | 'seller' | 'moderator' | 'admin';

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  location: string | null;
  province: string | null;
  region: string | null;
  skills: string[] | null;
  social_links: Record<string, string> | null;
  availability: 'available' | 'open_for_collab' | 'not_available' | null;
  is_verified: boolean;
  is_suspended: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: Role;
  created_at: string;
}

export interface ArtistProfile {
  id: string;
  user_id: string;
  stage_name: string | null;
  artist_type: string[] | null;
  genres: string[] | null;
  bio: string | null;
  portfolio_count: number;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItem {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  type: string;
  media: string[] | null;
  external_links: Record<string, string> | null;
  tools: string[] | null;
  credits: string | null;
  published_at: string | null;
  visibility: 'public' | 'unlisted' | 'private';
  tags: string[] | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Block {
  id: string;
  blocker_id: string;
  blocked_id: string;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  content: string | null;
  media: string[] | null;
  embed_url: string | null;
  embed_platform: 'youtube' | 'spotify' | 'soundcloud' | null;
  link_url: string | null;
  link_title: string | null;
  link_preview: string | null;
  status: 'published' | 'hidden' | 'removed';
  like_count: number;
  comment_count: number;
  bookmark_count: number;
  share_count: number;
  moderation_reason: string | null;
  moderated_at: string | null;
  moderated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostMedia {
  id: string;
  post_id: string;
  url: string;
  type: 'image' | 'video';
  sort_order: number;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
  content: string;
  status: 'published' | 'hidden' | 'removed';
  like_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Bookmark {
  id: string;
  user_id: string;
  post_id: string | null;
  portfolio_id: string | null;
  created_at: string;
}

export interface Venue {
  id: string;
  owner_id: string | null;
  name: string;
  description: string | null;
  venue_type: string | null;
  address: string | null;
  province: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  capacity: number | null;
  indoor_outdoor: 'indoor' | 'outdoor' | 'both' | null;
  equipment: string[] | null;
  price_range: string | null;
  opening_hours: Record<string, string> | null;
  terms: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  website: string | null;
  social_links: Record<string, string> | null;
  verification_status: 'pending' | 'verified' | 'rejected';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface VenueAmenity {
  id: string;
  venue_id: string;
  name: string;
}

export interface VenueSubmission {
  id: string;
  user_id: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  venue_id: string | null;
  created_at: string;
}

export interface EventCategory {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  created_at: string;
}

export interface Event {
  id: string;
  organizer_id: string;
  venue_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  category_id: string | null;
  start_at: string;
  end_at: string;
  doors_open_at: string | null;
  age_requirement: number | null;
  contact_info: string | null;
  cancellation_policy: string | null;
  status: 'draft' | 'scheduled' | 'live' | 'completed' | 'cancelled';
  published: boolean;
  allow_resale: boolean;
  max_resale_price_percent: number | null;
  created_at: string;
  updated_at: string;
}

export interface EventArtist {
  id: string;
  event_id: string;
  artist_id: string;
  role: string | null;
  sort_order: number;
}

export interface EventAnnouncement {
  id: string;
  event_id: string;
  title: string;
  content: string;
  published_at: string;
}

export interface TicketType {
  id: string;
  event_id: string;
  name: string;
  description: string | null;
  price_cents: number;
  currency: string;
  total_quantity: number;
  sold_quantity: number;
  reserved_quantity: number;
  sale_start_at: string | null;
  sale_end_at: string | null;
  max_per_order: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TicketOrder {
  id: string;
  user_id: string;
  event_id: string;
  status: 'pending' | 'paid' | 'failed' | 'expired' | 'refunded' | 'cancelled';
  total_cents: number;
  currency: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'expired' | 'refund_pending' | 'refunded';
  payment_reference: string | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TicketOrderItem {
  id: string;
  order_id: string;
  ticket_type_id: string;
  quantity: number;
  price_cents: number;
}

export interface Ticket {
  id: string;
  order_id: string;
  order_item_id: string;
  user_id: string;
  event_id: string;
  ticket_type_id: string;
  qr_token: string;
  status: 'valid' | 'used' | 'cancelled' | 'refunded' | 'transferred';
  owner_id: string;
  checked_in_at: string | null;
  checked_in_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface TicketResaleListing {
  id: string;
  ticket_id: string;
  seller_id: string;
  price_cents: number;
  status: 'available' | 'reserved' | 'sold' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface TicketTransfer {
  id: string;
  ticket_id: string;
  from_user_id: string;
  to_user_id: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Payment {
  id: string;
  order_id: string;
  user_id: string;
  amount_cents: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'expired' | 'refunded';
  provider: string;
  provider_payment_id: string | null;
  reference: string | null;
  dynamic_qr_data: Record<string, unknown> | null;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentWebhookEvent {
  id: string;
  payment_id: string;
  provider: string;
  event_type: string;
  payload: Record<string, unknown>;
  processed: boolean;
  created_at: string;
}

export interface RefundRequest {
  id: string;
  order_id: string;
  user_id: string;
  amount_cents: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface TicketCheckin {
  id: string;
  ticket_id: string;
  event_id: string;
  checked_in_by: string;
  checked_in_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  category: 'music' | 'art' | 'event' | 'general';
  created_at: string;
}

export interface MarketplaceListing {
  id: string;
  seller_id: string;
  title: string;
  description: string | null;
  category: string;
  price_cents: number;
  currency: string;
  quantity: number;
  sold_quantity: number;
  status: 'available' | 'reserved' | 'sold' | 'unavailable';
  condition: string | null;
  shipping_info: string | null;
  rights_info: string | null;
  refund_policy: string | null;
  media: string[] | null;
  digital_file_url: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ListingMedia {
  id: string;
  listing_id: string;
  url: string;
  type: 'image' | 'video';
  sort_order: number;
}

export interface MarketplaceOrder {
  id: string;
  buyer_id: string;
  listing_id: string;
  quantity: number;
  total_cents: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  shipping_address: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}

export interface Shipment {
  id: string;
  order_id: string;
  tracking_number: string | null;
  carrier: string | null;
  status: 'pending' | 'shipped' | 'delivered' | 'returned';
  created_at: string;
}

export interface DigitalAssetAccess {
  id: string;
  order_id: string;
  user_id: string;
  file_url: string | null;
  access_expires_at: string | null;
  download_count: number;
  created_at: string;
}

export interface Conversation {
  id: string;
  type: 'direct' | 'group';
  name: string | null;
  created_at: string;
  updated_at: string;
}

export interface ConversationMember {
  id: string;
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at: string | null;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  created_at: string;
}


export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface NewsArticle {
  id: string;
  author_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  cover_image: string | null;
  content: string;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CollaborationPost {
  id: string;
  author_id: string;
  title: string;
  description: string;
  job_type: string;
  compensation: string | null;
  compensation_type: 'paid' | 'exchange' | 'volunteer' | null;
  deadline: string | null;
  contact_info: string | null;
  status: 'open' | 'filled' | 'closed';
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface CollaborationApplication {
  id: string;
  post_id: string;
  applicant_id: string;
  message: string | null;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  target_type: 'post' | 'comment' | 'user' | 'conversation' | 'message' | 'listing' | 'event';
  target_id: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  created_at: string;
}

export interface ModerationAction {
  id: string;
  actor_id: string;
  target_type: string;
  target_id: string;
  action: 'hide' | 'remove' | 'block_user' | 'unblock_user' | 'suspend' | 'unsuspend';
  reason: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export interface PlatformSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_by: string | null;
  updated_at: string;
}
export interface MessageAttachment {
  id: string;
  message_id: string;
  url: string;
  type: string;
  file_size: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  content: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface NotificationPreference {
  id: string;
  user_id: string;
  type: string;
  enabled: boolean;
  created_at: string;
}

export interface PostTag {
  id: string;
  post_id: string;
  tag_id: string;
}