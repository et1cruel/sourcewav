import { Link } from 'react-router-dom';
import { MapPin, Mic, Users, Image, Ticket, Palette } from 'lucide-react';

export function Home() {
  const features = [
    { icon: Mic, label: 'ชุมชน Underground', desc: 'แลกเปลี่ยนความคิด โพสต์ผลงาน ติดตามศิลปินอิสระ' },
    { icon: Users, label: 'โปรไฟล์ศิลปิน', desc: 'สร้างตัวตน ผลงาน Portfolio และหาคนร่วมงาน' },
    { icon: MapPin, label: 'แผนที่อีเวนต์ไทย', desc: 'ค้นหากิจกรรมดนตรีและศิลปะทั่วประเทศ' },
    { icon: Ticket, label: 'ซื้อบัตรเข้างาน', desc: 'ออกบัตรที่ตรวจสอบได้ ขายต่ออย่างปลอดภัย' },
    { icon: Image, label: 'ตลาดศิลปะ', desc: 'ซื้อขายผลงานศิลปะ สินค้า และบริการสร้างสรรค์' },
    { icon: Palette, label: 'กระดานร่วมงาน', desc: 'ประกาศหาทีม Producer, Rapper, ช่างภาพ และอื่นๆ' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-nearblack border-b border-border py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-full border border-border text-xs font-bold tracking-wider text-acidlime uppercase mb-6">
            Underground Culture Hub
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-offwhite leading-tight mb-6">
            พื้นที่ดิจิทัลของวัฒนธรรม Underground ในไทย
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto mb-10">
            เชื่อมต่อศิลปินแรป ฮิปฮอป ศิลปะอิสระ งานอีเวนต์ และตลาดผลงานสร้างสรรค์ทั่วประเทศไทย
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-acidlime text-charcoal font-bold px-8 py-3 rounded-lg text-lg hover:bg-acidlime/90 transition">
              เริ่มต้นใช้งาน
            </Link>
            <Link to="/events/map" className="border border-border bg-transparent text-offwhite font-bold px-8 py-3 rounded-lg text-lg hover:bg-secondary transition">
              สำรวจแผนที่อีเวนต์
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.label} className="p-6 rounded-lg border border-border bg-card hover:bg-secondary transition">
                <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center mb-4 text-acidlime">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-offwhite mb-2">{f.label}</h3>
                <p className="text-muted text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}