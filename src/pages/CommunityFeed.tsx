import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { ThumbsUp, MessageSquare, Bookmark, User, MoreHorizontal } from 'lucide-react';
import { formatThaiDate } from '@/lib/utils';
import type { Post } from '@/types/database';

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
    supabase.auth.onAuthStateChange(() => {
      loadPosts();
    });
  }, []);

  async function loadPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);
    if (!error && data) setPosts(data as Post[]);
    setLoading(false);
  }

  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from('posts').insert({
      author_id: user.id,
      content,
      status: 'published',
    });
    if (!error) {
      setContent('');
      loadPosts();
    }
  }

  async function toggleLike(postId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const existing = posts.find(p => p.id === postId);
    const willUnlike = (existing?.like_count ?? 0) > 0;
    setPosts(posts.map(p => p.id === postId ? { ...p, like_count: p.like_count + (willUnlike ? -1 : 1) } : p));
    if (willUnlike) {
      await supabase.from('post_likes').delete().match({ post_id: postId, user_id: user.id });
    } else {
      await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id });
    }
  }

  if (loading) return <div className="p-4">กำลังโหลด…</div>;

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      <div className="bg-card border border-border rounded-lg p-5">
        <form onSubmit={createPost} className="space-y-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-acidlime font-bold">
              U
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="กำลังคิดอะไรอยู่… แชร์ผลงาน ข่าว หรืออีเวนต์ได้เลย"
              className="flex-1 bg-transparent resize-none min-h-[80px] text-offwhite placeholder:text-muted focus:outline-none"
              rows={3}
            />
          </div>
          <Button type="submit" className="bg-acidlime text-charcoal font-bold">โพสต์</Button>
        </form>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-card border border-border rounded-lg p-4 hover:bg-secondary transition">
            <div className="flex gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-offwhite">
                {post.author_id.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-offwhite truncate">{post.author_id.slice(0, 8)}…</span>
                  <span className="text-xs text-muted">· {formatThaiDate(post.created_at)}</span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-muted" />
            </div>
            <p className="text-offwhite text-sm leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-muted hover:text-acidlime">
                <ThumbsUp className="w-4 h-4" /> <span>{post.like_count}</span>
              </button>
              <Link to={`/community#comment-${post.id}`} className="flex items-center gap-1.5 text-muted hover:text-acidlime">
                <MessageSquare className="w-4 h-4" /> <span>{post.comment_count}</span>
              </Link>
              <button className="flex items-center gap-1.5 text-muted hover:text-acidlime">
                <Bookmark className="w-4 h-4" /> บันทึก
              </button>
              <Link to={`/artists/${post.author_id}`} className="flex items-center gap-1.5 text-acidlime hover:text-acidlime/90 font-medium text-sm">
                <User className="w-3 h-3 mr-1" /> ดูโปรไฟล์
              </Link>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="text-center py-10 text-muted">ยังไม่มีโพสต์ เริ่มต้นโพสต์ข้อความแรกได้เลย</div>
        )}
      </div>
    </div>
  );
}