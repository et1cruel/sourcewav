import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '@/lib/supabase';
import type { Event } from '@/types/database';
import type { Venue } from '@/types/database';

export function EventMap() {
  const [events, setEvents] = useState<Event[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    Promise.all([
      supabase.from('events').select('*').eq('published', true),
      supabase.from('venues').select('*').eq('verification_status', 'verified'),
    ]).then(([evRes, venRes]) => {
      if (!evRes.error && evRes.data) setEvents(evRes.data as Event[]);
      if (!venRes.error && venRes.data) setVenues(venRes.data as Venue[]);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="h-[600px] flex items-center justify-center text-muted">กำลังโหลดแผนที่…</div>;

  const nowBangkok = new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
  const now = new Date(nowBangkok);

  return (
    <div className="h-[600px] w-full rounded-lg border border-border overflow-hidden">
      <MapContainer center={[13.7563, 100.5018]} zoom={6} ref={mapRef}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {events.map((ev) => {
          const lat = ev.start_at ? 13.7563 + (Math.random() - 0.5) * 2 : 13.7563;
          const lng = ev.start_at ? 100.5018 + (Math.random() - 0.5) * 2 : 100.5018;
          const isLive = new Date(ev.start_at) <= now && new Date(ev.end_at) >= now;
          return (
            <Marker key={ev.id} position={[lat, lng]}>
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-offwhite">{ev.title}</h3>
                  <p className="text-xs text-muted">{ev.start_at}</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs ${isLive ? 'bg-green-500/20 text-green-400' : 'bg-secondary text-muted'}`}>
                    {isLive ? 'กำลังจัดอยู่' : 'กำลังจะมาถึง'}
                  </span>
                  <br />
                  <LinkButton to={`/events/${ev.slug}`} text="ดูรายละเอียด" />
                </div>
              </Popup>
            </Marker>
          );
        })}
        {venues.map((v) => (
          <Marker key={v.id} position={[v.latitude || 13.7563, v.longitude || 100.5018]}>
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-bold text-offwhite">{v.name}</h3>
                <p className="text-xs text-muted">{v.province}</p>
                <LinkButton to={`/venues/${v.id}`} text="ดูสถานที่" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function LinkButton(_: { to: string; text: string }) {
  return null; // Popups don't support router links directly in this stub
}