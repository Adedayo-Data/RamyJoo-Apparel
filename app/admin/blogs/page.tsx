// app/admin/blogs/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/config/api';

type Blog = {
  id: number;
  title: string;
  content: string;
  author: string;
  featuredImage: string;
  createdAt: string;
};

export default function AdminBlogListPage() {
  const { isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) router.push('/admin/login');
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/api/admin/blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
        toast.warning('Could not load blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this blog post?');
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('admin_token');
      const res = await fetch(`${API_URL}/api/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete blog');

      setBlogs((prev) => prev.filter((b) => b.id !== id));
      toast.success('Blog post deleted successfully');
    } catch (err) {
      console.error(err);
      toast.warning('Error deleting blog post.');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link href="/admin/blogs/new">
          <Button className="text-white bg-blue-600 hover:bg-blue-700">New Blog</Button>
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white dark:bg-gray-900 p-4 shadow rounded-lg">
              <img src={blog.featuredImage} alt={blog.title} className="w-full h-40 object-cover rounded mb-2" />
              <h2 className="text-lg font-semibold mb-1">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-2">By {blog.author}</p>
              <div className="flex justify-between">
                <Link href={`/admin/blogs/${blog.id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button onClick={() => handleDelete(blog.id)} variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
