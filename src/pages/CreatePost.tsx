import { useState } from 'react';
import Button from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMsg('กรุณาเข้าสู่ระบบ'); setLoading(false); return; }
    const { error } = await supabase.from('posts').insert({ author_id: user.id, content, status: 'published' });
    setLoading(false);
    if (error) setMsg('โพสต์ไม่สำเร็จ: ' + error.message);
    else { setMsg('โพสต์สำเร็จ'); setContent(''); }
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <h1 className="font-display text-2xl font-bold text-offwhite mb-6">สร้างโพสต์ใหม่</h1>
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="แบ่งปันความคิด ผลงาน หรือข่าวสาร…"
          className="w-full bg-transparent resize-none min-h-[150px] text-offwhite placeholder:text-muted focus:outline-none"
          rows={6}
        />
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-acidlime text-charcoal font-bold" disabled={loading}>
            {loading ? 'กำลังโพสต์…' : 'โพสต์'}
          </Button>
        </div>
        {msg && (
          <p className={cn('text-sm', msg.includes('สำเร็จ') ? 'text-green-400' : 'text-red-400')}>
            {msg}
          </p>
        )}
      </form>
    </div>
  );
}