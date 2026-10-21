import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Button from '@/components/ui/button';
import { type Profile } from '@/types/database';

export function ArtistProfile() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!username) return;
    supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProfile(data as Profile);
        setLoading(false);
      });
  }, [username]);

  async function toggleFollow() {
    if (!profile || !username) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      await supabase.from('follows').delete().match({ follower_id: user.id, following_id: profile.id });
    } else {
      await supabase.from('follows').insert({ follower_id: user.id, following_id: profile.id });
    }
  }

  if (loading) return <div className="p-4">กำลังโหลด…</div>;
  if (!profile) return <div className="p-4 text-muted">ไม่พบโปรไฟล์นี้</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="relative h-48 w-full rounded-lg bg-secondary overflow-hidden">
        {profile.cover_url && <img src={profile.cover_url} alt="Cover" className="w-full h-full object-cover" />}
      </div>
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0 border-2 border-charcoal">
          {profile.username.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="font-display text-2xl font-bold text-offwhite">{profile.display_name}</h1>
          <p className="text-xs text-muted">@{profile.username}</p>
          {profile.bio && <p className="text-offwhite mt-2 text-sm">{profile.bio}</p>}
          <div className="flex gap-2 mt-4">
            <Button onClick={toggleFollow} className="flex-1">
              {isFollowing ? 'กำลังติดตาม' : 'ติดตาม'}
            </Button>
            <Button variant="outline" className="flex-1">ข้อความ</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm">
        <div>
          <div className="text-xl font-bold text-offwhite">0</div>
          <div className="text-muted">โพสต์</div>
        </div>
        <div>
          <div className="text-xl font-bold text-offwhite">0</div>
          <div className="text-muted">ผู้ติดตาม</div>
        </div>
        <div>
          <div className="text-xl font-bold text-offwhite">0</div>
          <div className="text-muted">กำลังติดตาม</div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="text-lg font-bold text-offwhite mb-4">ผลงาน (Portfolio)</h2>
        <div className="text-muted py-8 text-center">ยังไม่มีผลงาน เผยแพร่ผลงานแรกของคุณได้ที่หน้าจัดการผลงาน</div>
      </div>
    </div>
  );
}