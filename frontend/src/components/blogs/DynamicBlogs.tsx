'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Blog {
  _id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  views: number;
  createdAt: string;
  featured?: boolean;
}

export default function DynamicBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featured, setFeatured] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
    fetchFeatured();
  }, [selectedTag]);

  const fetchBlogs = async () => {
    try {
      const url = selectedTag
        ? `http://localhost:3001/blogs/tag/${selectedTag}`
        : 'http://localhost:3001/blogs?published=true';

      const response = await fetch(url);
      if (!response.ok) {
        console.error('Error fetching blogs:', response.status);
        setBlogs([]);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeatured = async () => {
    try {
      const response = await fetch('http://localhost:3001/blogs/featured');
      if (!response.ok) {
        setFeatured([]);
        return;
      }
      const data = await response.json();
      setFeatured(Array.isArray(data) ? data.slice(0, 2) : []);
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
      setFeatured([]);
    }
  };

  const allTags = blogs && blogs.length > 0 
    ? Array.from(new Set(blogs.flatMap((blog) => blog.tags || [])))
    : [];

  const filteredBlogs = selectedTag 
    ? blogs.filter(b => b.tags.includes(selectedTag))
    : blogs;

  return (
    <main className="w-full bg-white">
      {/* HERO SECTION */}
      <section className="min-h-[500px] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden py-32">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,92,191,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,191,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H2.75A1.25 1.25 0 001.5 2.75v14.5A1.25 1.25 0 002.75 18.5h14.5a1.25 1.25 0 001.25-1.25V9.5M14 1.5v8m0 0l-2.5-2.5m2.5 2.5l2.5-2.5" />
            </svg>
            Insights & Knowledge
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
            Blog &<br />Resources
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore our latest insights on AI, web development, cloud infrastructure, and digital innovation. Stay ahead with expert perspectives and practical guides.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#blogs"
              className="inline-flex items-center gap-2 bg-[#7c5cbf] text-white px-8 py-3 rounded-full font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-purple-200"
            >
              Read Articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED BLOGS */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Featured Articles</h2>
            <p className="text-gray-600 text-lg">Top stories and industry insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`}>
                <div className="group h-full rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer">
                  {/* Image */}
                  {blog.image && (
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-3 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-gray-600 mb-6 line-clamp-2">{blog.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>⭐ Featured</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* TAG FILTER */}
      {allTags.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center gap-6">
              <h3 className="text-lg font-semibold text-gray-900">Filter by Topic:</h3>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                    selectedTag === null
                      ? 'bg-[#7c5cbf] text-white shadow-lg shadow-purple-200'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
                  }`}
                >
                  All Articles
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 capitalize ${
                      selectedTag === tag
                        ? 'bg-[#7c5cbf] text-white shadow-lg shadow-purple-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ALL BLOGS GRID */}
      <section id="blogs" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {selectedTag ? `Articles on ${selectedTag}` : 'All Articles'}
          </h2>
          <p className="text-gray-600 text-lg">{filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'} available</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
            </svg>
            <p className="text-gray-600 text-lg">No articles found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <Link key={blog._id} href={`/blog/${blog.slug}`}>
                <div className="group h-full rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col">
                  {/* Image */}
                  {blog.image ? (
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="relative h-48 bg-gradient-to-br from-[#7c5cbf] to-purple-900 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white opacity-30" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2 flex-grow">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.description}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4">
                      <span className="flex items-center gap-1">
                        👁️ {blog.views} {blog.views === 1 ? 'view' : 'views'}
                      </span>
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-[#7c5cbf] to-purple-900 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Have a story to share?
          </h2>
          <p className="text-purple-100 text-lg mb-8">
            Join our community of tech enthusiasts and industry experts. Share your insights and connect with thousands of developers.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg"
          >
            Write an Article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
