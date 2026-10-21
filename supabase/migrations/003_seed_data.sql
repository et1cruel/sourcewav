-- ============================================
-- UNDERGROUND CULTURE HUB — Seed Data (Development Only)
-- ============================================

-- Event categories
insert into event_categories (name, slug, color) values
  ('Underground Rap / Hip-Hop Show', 'underground-rap-hiphop-show', '#b4f012'),
  ('Live Music / Concert', 'live-music-concert', '#00ff87'),
  ('Rap Battle / Cypher', 'rap-battle-cypher', '#7c3aed'),
  ('Beat Battle / Producer Meetup', 'beat-battle-producer-meetup', '#0f172a'),
  ('DJ Event / Club Night', 'dj-event-club-night', '#b4f012'),
  ('Art Exhibition / Gallery', 'art-exhibition-gallery', '#00ff87'),
  ('Tattoo Convention', 'tattoo-convention', '#7c3aed'),
  ('Graffiti / Street Art', 'graffiti-street-art', '#b4f012'),
  ('Art Market / Flea Market', 'art-market-flea-market', '#00ff87'),
  ('Creative Workshop', 'creative-workshop', '#7c3aed');

-- Tags
insert into tags (name, slug, category) values
  ('Underground Rap', 'underground-rap', 'music'),
  ('Cloud Rap', 'cloud-rap', 'music'),
  ('Rage', 'rage', 'music'),
  ('Boom Bap', 'boom-bap', 'music'),
  ('Trap', 'trap', 'music'),
  ('Experimental', 'experimental', 'music'),
  ('Beatmaking', 'beatmaking', 'music'),
  ('Graffiti', 'graffiti', 'art'),
  ('Tattoo', 'tattoo', 'art'),
  ('Photography', 'photography', 'art'),
  ('Fashion', 'fashion', 'art');

-- News categories
insert into news_categories (name, slug) values
  ('ข่าววงการเพลงไทย', 'thai-music-news'),
  ('ข่าว Hip-Hop และ Underground Scene', 'hip-hop-underground-news'),
  ('ข่าวศิลปินและผลงานใหม่', 'artist-news'),
  ('ข่าวกิจกรรมและอีเวนต์', 'event-news');

-- Venues (Thailand)
insert into venues (name, description, venue_type, address, province, region, latitude, longitude, capacity, indoor_outdoor, verification_status, is_active) values
  ('The Studio Bamboo', 'สถานที่จัดแสดงดนตรีอิสระและเวิร์กช็อปศิลปะในย่านอารีย์', 'Live House', 'ซอยอารีย์ 1', 'กรุงเทพมหานคร', 'กลาง', 13.7962, 100.5381, 200, 'indoor', 'verified', true),
  ('River East Warehouse', 'โกดังริมน้ำสำหรับงาน Graffiti, Art Market และคอนเสิร์ตกลางแจ้ง', 'Warehouse', 'ถนนพระราม 3', 'กรุงเทพมหานคร', 'กลาง', 13.6931, 100.5284, 500, 'outdoor', 'verified', true),
  ('Chiang Mai Creative Space', 'พื้นที่สร้างสรรค์สำหรับศิลปะอิสระและดนตรี underground ในเชียงใหม่', 'Creative Space', 'ถนนนิมมานเหมินทร์', 'เชียงใหม่', 'เหนือ', 18.7892, 98.9823, 150, 'both', 'verified', true),
  ('Phuket Art Loft', 'ลอฟท์ริมทะเลสำหรับงานศิลปะและดนตรีอิสระภูเก็ต', 'Loft', 'ถนนถลาง', 'ภูเก็ต', 'ใต้', 7.8879, 98.3864, 120, 'indoor', 'pending', true),
  ('Isan Underground Hall', 'หอประชุมสำหรับงาน Rap Battle และศิลปะอีสาน', 'Hall', 'ถนนศรีจันทร์', 'ขอนแก่น', 'อีสาน', 16.4362, 102.8322, 300, 'indoor', 'verified', true);