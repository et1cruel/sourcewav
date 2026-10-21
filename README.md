# UNDERGROUND CULTURE HUB

พื้นที่ดิจิทัลของวัฒนธรรม Underground Rap, Hip-Hop และ Independent Art ในประเทศไทย

แพลตฟอร์มแบบ Full-Stack สำหรับชุมชนศิลปินอิสระ ศิลปะบนท้องถนน และวัฒนธรรมดนตรีใต้ดิน ประกอบด้วยฟีดชุมชน โปรไฟล์ศิลปินและพอร์ตโฟลิโอ ค้นพบอีเวนต์ผ่านแผนที่ประเทศไทย ระบบซื้อบัตร ตลาดซื้อขายผลงานศิลปะ ระบบแชท และแดชบอร์ดผู้ดูแลระบบ

## สแต็กเทคโนโลยี

- Frontend: React + TypeScript + Vite + Tailwind CSS + React Router + TanStack Query + Leaflet + OpenStreetMap
- Backend/Database: Supabase (Auth, PostgreSQL, Storage, Realtime, Row Level Security)
- ฟอร์มและการตรวจสอบ: React Hook Form + Zod
- ไอคอน: Lucide React

## โครงสร้างโครงการ

```
src/
  lib/              supabase client, utils
  types/            database type definitions
  components/       UI components (shadcn-like design system) + Navbar
  pages/            ทุกหน้าของแอป
  hooks/            custom hooks (เตรียมไว้สำหรับเฟสถัดไป)
  context/          React context (เตรียมไว้สำหรับเฟสถัดไป)
supabase/
  migrations/       ไฟล์マイグ레이ชันฐานข้อมูล (SQL)
```

## การติดตั้งและรันในสภาพแวดล้อมพัฒนา

```bash
# ติดตั้ง dependencies
npm install

# คัดลอกไฟล์ตัวแปรสภาพแวดล้อม
cp .env.example .env
# แก้ไข .env ใส่ Supabase URL และ Anon Key ของคุณ

# รันเซิร์ฟเวอร์พัฒนา
npm run dev

# สร้างไฟล์สำหรับ production
npm run build

# รันทดสอบ
npm test
```

## การตั้งค่าฐานข้อมูล (Supabase)

1. สร้างโปรเจกต์บน [Supabase](https://supabase.com)
2. คัดลอก `VITE_SUPABASE_URL` และ `VITE_SUPABASE_ANON_KEY` ไปยัง `.env`
3. รันマイกร레이ชัน SQL ในตาราง SQL Editor ของ Supabase (ดูโฟลเดอร์ `supabase/migrations`)
4. เปิดใช้งาน Row Level Security (RLS) ตามนโยบายในマイกร레이ชัน

## โหมดทดสอบการชำระเงิน (Sandbox)

ระบบชำระเงินเริ่มต้นอยู่ใน **Sandbox Mode** (จำลอง) จนกว่าจะมีการตั้งค่า Merchant Account และ API Credentials จริงจากผู้ให้บริการชำระเงินที่รองรับ PromptPay QR ในประเทศไทย

- ไม่มีการจำลองสถานะ "ชำระเงินสำเร็จ" สำหรับธุรกรรมจริง
- QR สำหรับชำระเงินแยกจาก QR สำหรับตรวจสอบบัตรเข้างานอย่างชัดเจน
- การออกบัตรจะเกิดขึ้นหลังจากยืนยันการชำระเงินฝั่งเซิร์ฟเวอร์เท่านั้น

## ฟีเจอร์ที่พร้อมใช้งาน (เฟส 1-2)

- สมัครสมาชิก / เข้าสู่ระบบ (Supabase Auth)
- สร้างและแก้ไขโปรไฟล์ผู้ใช้
- ฟีดชุมชน: โพสต์ ข้อความ ถูกใจ แสดงความคิด_equal
- โปรไฟล์ศิลปินและไดเรกทอรีศิลปิน
- แผนที่อีเวนต์ประเทศไทย (Leaflet + OpenStreetMap) เชื่อมกับข้อมูลในฐานข้อมูล
- รายละเอียดอีเวนต์และหน้าซื้อบัตร

## ฟีเจอร์ที่กำลังพัฒนา (เฟสถัดไป)

- ระบบซื้อบัตรและชำระเงินจริง (Ticketing & Payments)
- ระบบขายต่อบัตรและตรวจสอบบัตรเข้างานด้วย QR
- ตลาดซื้อขายผลงานศิลปะ (Marketplace)
- ระบบแชทเรียลไทม์ (Real-time Chat)
- ระบบแจ้งเตือน (Notification Center)
- แดชบอร์ดผู้ดูแลระบบและการควบคุมเนื้อหา (Admin & Moderation)

## ความปลอดภัย

- รหัสลับทั้งหมดเก็บเฉพาะในตัวแปรสภาพแวดล้อมฝั่งเซิร์ฟเวอร์
- ไม่เปิดเผย Service Role Key ไปยัง Frontend
- ตรวจสอบสิทธิ์ทุกการกระทำบน Backend (RLS + Authorization)
- ไม่เก็บรหัสผ่านหรือโทเค็นลงใน Log

## ใบอนุญาต

ประมวลผลโดยทีมพัฒนา UNDERGROUND CULTURE HUB