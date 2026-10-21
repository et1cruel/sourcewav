import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { AlertCircle } from 'lucide-react';

export function Register() {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, display_name: displayName },
      },
    });
    if (err) {
      setLoading(false);
      setError(err.message);
      return;
    }
    if (data?.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        username,
        display_name: displayName,
      });
      setLoading(false);
      navigate('/feed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-offwhite mb-2">สร้างบัญชีใหม่</h2>
          <p className="text-muted">เข้าร่วมชุมชนวัฒนธรรม Underground ในไทย</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-offwhite">ชื่อผู้ใช้ (Username)</label>
            <Input type="text" placeholder="underground_artist" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-offwhite">ชื่อที่แสดง (Display Name)</label>
            <Input type="text" placeholder="ศิลปินอิสระ" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-offwhite">อีเมล</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-offwhite">รหัสผ่าน</label>
            <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && (
            <div className="flex items-center gap-2 px-3 py-2 rounded bg-red-900/20 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          <Button type="submit" className="w-full bg-acidlime text-charcoal font-bold py-3" disabled={loading}>
            {loading ? 'กำลังสร้างบัญชี…' : 'สร้างบัญชี'}
          </Button>
        </form>
        <p className="text-center text-sm text-muted">
          มีบัญชีอยู่แล้ว?{' '}
          <Link to="/login" className="text-acidlime hover:text-acidlime/90 font-medium">
           เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}