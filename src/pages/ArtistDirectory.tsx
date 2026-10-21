import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/types/database';

export function ArtistDirectory() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (!error && data) setProfiles(data as Profile[]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">กำลังโหลด…</div>;

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h1 className="font-display text-3xl font-bold text-offwhite mb-6">ศิลปินและผู้สร้างสรรค์</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((p) => (
          <Link
            key={p.id}
            to={`/artists/${p.username}`}
            className="group block bg-card border border-border rounded-lg p-4 hover:bg-secondary transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                {p.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-offwhite">{p.display_name}</h3>
                <p className="text-xs text-muted">@{p.username}</p>
              </div>
            </div>
            {p.bio && <p className="text-muted text-sm mb-3 line-clamp-2">{p.bio}</p>}
            <div className="flex items-center gap-2 text-xs text-muted">
              {p.province && <span>{p.province}</span>}
              {p.skills && p.skills.slice(0, 3).map((s) => (
                <span key={s} className="px-2 py-1 rounded bg-secondary text-xs">{s}</span>
              ))}
            </div>
          </Link>
        ))}
        {profiles.length === 0 && <p className="text-muted">ยังไม่มีโปรไฟล์ศิลปิน</p>}
      </div>
    </div>
  );
}