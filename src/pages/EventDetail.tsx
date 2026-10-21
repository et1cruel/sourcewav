import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Event } from '@/types/database';
import { MapPin, Clock } from 'lucide-react';
import { formatThaiDate } from '@/lib/utils';

export function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setEvent(data as Event);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-4">กำลังโหลด…</div>;
  if (!event) return <div className="p-4 text-muted">ไม่พบอีเวนต์นี้</div>;

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      <div className="rounded-lg bg-secondary h-64 flex items-center justify-center text-muted">
        ภาพปกอีเวนต์
      </div>
      <div className="space-y-4">
        <h1 className="font-display text-3xl font-bold text-offwhite">{event.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted">
          <MapPin className="w-4 h-4" /> {event.venue_id ? 'สถานที่จัดงาน' : 'สถานที่ระบุในรายละเอียด'}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted">
          <Clock className="w-4 h-4" /> {formatThaiDate(event.start_at)} ถึง {formatThaiDate(event.end_at)}
        </div>
        <p className="text-offwhite">{event.description || 'ไม่มีรายละเอียด'}</p>
        <div className="flex gap-3">
          <Link to="/my-tickets" className="flex-1 bg-acidlime text-charcoal font-bold py-3 rounded-lg text-center">
            ซื้อบัตร
          </Link>
          <Link to="/" className="flex-1 border border-border text-offwhite py-3 rounded-lg text-center hover:bg-secondary">
            กลับไปหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
}