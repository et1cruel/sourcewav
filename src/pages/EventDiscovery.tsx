import { Link } from 'react-router-dom';

export function EventDiscovery() {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <h1 className="font-display text-3xl font-bold text-offwhite mb-6">ค้นพบอีเวนต์</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Link key={i} to="/events/underground-rap-show" className="group block bg-card border border-border rounded-lg p-4 hover:bg-secondary transition">
            <div className="h-32 rounded-lg bg-secondary mb-3 flex items-center justify-center text-muted">
              ภาพปกอีเวนต์
            </div>
            <h3 className="font-bold text-offwhite mb-1">Underground Rap Show #{i}</h3>
            <p className="text-xs text-muted">กรุงเทพมหานคร · เร็วๆ นี้</p>
          </Link>
        ))}
      </div>
    </div>
  );
}