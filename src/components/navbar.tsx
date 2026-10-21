import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'หน้าหลัก' },
    { path: '/community', label: 'ชุมชน' },
    { path: '/discover', label: 'ค้นพบศิลปิน' },
    { path: '/events/map', label: 'แผนที่อีเวนต์' },
    { path: '/marketplace', label: 'ตลาดศิลปะ' },
    { path: '/news', label: 'ข่าวสาร' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-charcoal/95 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-acidlime flex items-center justify-center">
            <span className="text-charcoal font-bold text-xs">UCH</span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">UNDERGROUND CULTURE HUB</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'transition-colors hover:text-acidlime',
                location.pathname === item.path ? 'text-acidlime' : 'text-muted',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="ghost sm:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/events/map" className="hidden sm:flex items-center gap-2 text-xs font-bold px-3 py-2 rounded bg-secondary hover:bg-muted">
            <MapPin className="w-4 h-4" /> แผนที่
          </Link>
          <Link to="/login" className="hidden sm:flex items-center gap-2 text-xs font-bold px-3 py-2 rounded border border-border hover:bg-secondary">
            <User className="w-4 h-4" /> เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </nav>
  );
}