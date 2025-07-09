'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { API_URL } from '@/config/api';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('admin_token');
        const res = await fetch(`${API_URL}/api/admin/blogs/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch blog');
        const blog = await res.json();

        setTitle(blog.title);
        setAuthor(blog.author);
        setContent(blog.content);
      } catch (err) {
        console.error(err);
        toast.error('Unable to fetch blog details.');
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admin_token');
      const updateRes = await fetch(`${API_URL}/api/admin/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          author,
          content,
        }),
      });

      if (!updateRes.ok) throw new Error('Failed to update blog');

      // Upload new image if selected
      if (featuredImage) {
        const formData = new FormData();
        formData.append('file', featuredImage);

        const imageRes = await fetch(`${API_URL}/api/admin/blogs/${blogId}/images`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!imageRes.ok) throw new Error('Image upload failed');
      }

      toast.success('Blog updated successfully!');
      router.push('/admin/blogs');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update blog post.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            placeholder="Type your blog content here..."
            className="resize-y"
          />
        </div>
        <div>
          <Label htmlFor="image">Update Featured Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
          />
        </div>
        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
          Update Blog
        </Button>
      </form>
    </div>
  );
}
