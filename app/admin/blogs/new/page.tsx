// app/admin/blogs/new/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { API_URL } from '@/config/api';

export default function NewBlogPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('admin_token');
      const blogRes = await fetch(`${API_URL}/api/admin/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author, content }),
      });

      if (!blogRes.ok) throw new Error('Failed to create blog');

      const newBlog = await blogRes.json();

      // If image is selected, upload it
      if (featuredImage) {
        const formData = new FormData();
        formData.append('file', featuredImage);

        const imgRes = await fetch(`${API_URL}/api/admin/blogs/${newBlog.id}/images`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!imgRes.ok) throw new Error('Image upload failed');
      }

      toast.success('Blog created successfully!');
      router.push('/admin/blogs');
    } catch (err) {
      console.error(err);
      toast.warning('Failed to create blog post.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
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
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            required
          />
        </div>
        <div>
          <Label htmlFor="image">Featured Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
          />
        </div>
        <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
          Publish Blog
        </Button>
      </form>
    </div>
  );
}



// app/admin/blogs/new/page.tsx

// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { API_URL } from '@/config/api';
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Heading from '@tiptap/extension-heading';
// import Bold from '@tiptap/extension-bold';
// import Underline from '@tiptap/extension-underline';
// import BulletList from '@tiptap/extension-bullet-list';
// import ListItem from '@tiptap/extension-list-item';
// import './editor.css';

// export default function NewBlogPage() {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [featuredImage, setFeaturedImage] = useState<File | null>(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Bold,
//       Underline,
//       Heading.configure({ levels: [2, 3, 4] }),
//       BulletList,
//       ListItem,
//     ],
//     content: '',
//     editorProps: {
//       attributes: {
//         class: 'min-h-[300px] p-4 outline-none',
//       },
//     },
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editor) return;

//     try {
//       const token = localStorage.getItem('admin_token');
//       const blogRes = await fetch(`${API_URL}/admin/blogs`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           title,
//           author,
//           content: editor.getHTML(),
//         }),
//       });

//       if (!blogRes.ok) throw new Error('Failed to create blog');

//       const newBlog = await blogRes.json();

//       if (featuredImage) {
//         const formData = new FormData();
//         formData.append('file', featuredImage);

//         const imgRes = await fetch(`${API_URL}/admin/blogs/${newBlog.id}/images`, {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         });

//         if (!imgRes.ok) throw new Error('Image upload failed');
//       }

//       toast.success('Blog created successfully!');
//       router.push('/admin/blogs');
//     } catch (err) {
//       console.error(err);
//       toast.warning('Failed to create blog post.');
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <Label htmlFor="title">Title</Label>
//           <Input
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="author">Author</Label>
//           <Input
//             id="author"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="content">Content</Label>
//           <div className="border rounded bg-white">
//             {/* Toolbar */}
//             <div className="flex gap-2 p-2 border-b bg-gray-50">
//               <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBold().run()}>
//                 Bold
//               </Button>
//               <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
//                 H2
//               </Button>
//               <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
//                 H3
//               </Button>
//               <Button type="button" variant="ghost" size="sm" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
//                 List
//               </Button>
//             </div>
//             <EditorContent editor={editor} />
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="image">Featured Image</Label>
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFeaturedImage(e.target.files?.[0] || null)}
//           />
//         </div>
//         <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
//           Publish Blog
//         </Button>
//       </form>
//     </div>
//   );
// }

