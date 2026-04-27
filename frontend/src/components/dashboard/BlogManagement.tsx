'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Blog {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  content?: string;
  image?: string;
  imageLink?: string;
  tags: string[];
  featured?: boolean;
  published?: boolean;
}

export default function BlogManagement() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [formData, setFormData] = useState<Blog>({
    slug: '',
    title: '',
    description: '',
    content: '',
    image: '',
    imageLink: '',
    tags: [],
    featured: false,
    published: true,
  });
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/blogs');
      if (!response.ok) {
        console.error('Error fetching blogs:', response.status);
        setBlogs([]);
        return;
      }
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('access_token');
      const method = editingSlug ? 'PUT' : 'POST';
      const endpoint = editingSlug ? `http://localhost:3001/blogs/${editingSlug}` : 'http://localhost:3001/blogs';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, author: user?.username }),
      });

      if (response.ok) {
        setFormData({
          slug: '',
          title: '',
          description: '',
          content: '',
          image: '',
          imageLink: '',
          tags: [],
          featured: false,
          published: true,
        });
        setEditingSlug(null);
        fetchBlogs();
        alert(editingSlug ? 'Blog updated!' : 'Blog created!');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setFormData(blog);
    setEditingSlug(blog.slug);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:3001/blogs/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchBlogs();
        alert('Blog deleted!');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">📝 Blog Management</h1>

      {/* Blog Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold mb-6">{editingSlug ? 'Edit Blog' : 'Create New Blog'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="slug"
            placeholder="Blog Slug (e.g., my-first-blog)"
            value={formData.slug}
            onChange={handleInputChange}
            disabled={!!editingSlug}
            className="w-full px-4 py-2 border rounded"
            required
          />

          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            required
          />

          <textarea
            name="description"
            placeholder="Meta Description (for SEO)"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            rows={2}
            required
          />

          <textarea
            name="content"
            placeholder="Blog Content (Full Article)"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
            rows={6}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />

          <input
            type="text"
            name="imageLink"
            placeholder="Image Link/Alt Text"
            value={formData.imageLink}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded"
          />

          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag (e.g., seo, security)"
              className="flex-1 px-4 py-2 border rounded"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Tag
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span key={index} className="bg-blue-200 px-3 py-1 rounded flex items-center gap-2">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
              />
              <span>Published</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
              />
              <span>Featured</span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : editingSlug ? 'Update Blog' : 'Create Blog'}
            </button>
            {editingSlug && (
              <button
                type="button"
                onClick={() => {
                  setEditingSlug(null);
                  setFormData({
                    slug: '',
                    title: '',
                    description: '',
                    content: '',
                    image: '',
                    imageLink: '',
                    tags: [],
                    featured: false,
                    published: true,
                  });
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Blogs List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Your Blogs</h2>
        <div className="grid gap-4">
          {blogs.length === 0 ? (
            <p className="text-gray-500">No blogs yet. Create your first blog!</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{blog.title}</h3>
                    <p className="text-gray-600 text-sm">Slug: {blog.slug}</p>
                    <p className="text-gray-700 my-2">{blog.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {blog.tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 px-2 py-1 text-sm rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {blog.featured && <span className="text-yellow-600 mr-3">⭐ Featured</span>}
                      {blog.published ? (
                        <span className="text-green-600">✓ Published</span>
                      ) : (
                        <span className="text-red-600">Draft</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.slug)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
