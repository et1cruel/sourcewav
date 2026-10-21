import { useParams } from 'react-router-dom';

export function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <h1 className="font-display text-2xl font-bold text-offwhite mb-6">รายละเอียดผลงาน</h1>
      <p className="text-muted">ผลงาน ID: {id} — รายละเอียดจะแสดงที่นี่</p>
    </div>
  );
}