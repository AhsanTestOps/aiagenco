'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Blog {
  _id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  tags: string[];
  author?: string;
  views: number;
  createdAt: string;
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blogs/${slug}`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const data = await response.json();
        setBlog(data);

        // Fetch related blogs by tags
        if (data.tags && data.tags.length > 0) {
          const tagResponse = await fetch(`http://localhost:3001/blogs/tag/${data.tags[0]}`);
          if (tagResponse.ok) {
            const tagBlogs = await tagResponse.json();
            setRelatedBlogs(
              Array.isArray(tagBlogs)
                ? tagBlogs.filter((b: Blog) => b.slug !== slug).slice(0, 3)
                : []
            );
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The article you are looking for does not exist.'}</p>
          <Link href="/blogs" className="inline-flex items-center gap-2 bg-[#7c5cbf] text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-all">
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full bg-white">
      {/* BACK NAVIGATION */}
      <div className="max-w-4xl mx-auto px-6 pt-8 pb-4">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>
      </div>

      {/* ARTICLE HEADER */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag) => (
            <span key={tag} className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold">
              {(blog.author || 'A')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{blog.author || 'Admin'}</p>
              <p className="text-sm text-gray-600">Author</p>
            </div>
          </div>

          <div className="text-center">
            <p className="font-semibold text-gray-900">{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-sm text-gray-600">Published</p>
          </div>

          <div className="text-center">
            <p className="font-semibold text-gray-900">{blog.views}</p>
            <p className="text-sm text-gray-600">Views</p>
          </div>

          <div className="flex-1 text-right">
            <p className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full inline-block">
              {Math.ceil((blog.content?.split(' ') || []).length / 200)} min read
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      {blog.image && (
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          </div>
        </section>
      )}

      {/* DESCRIPTION */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{blog.description}</p>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-800 leading-8 whitespace-pre-wrap font-medium text-base space-y-6">
            {blog.content ? (
              blog.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="text-gray-700">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-gray-600 italic">No content available for this article.</p>
            )}
          </div>
        </div>
      </article>

      {/* TAGS SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-200">
        <div className="flex flex-wrap gap-3">
          {blog.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blogs?tag=${tag}`}
              className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-purple-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {relatedBlogs.length > 0 && (
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog._id} href={`/blog/${relatedBlog.slug}`}>
                  <div className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    {relatedBlog.image ? (
                      <div className="h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
                        <img
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#7c5cbf] to-purple-900 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white opacity-20" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                        </svg>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {relatedBlog.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2 line-clamp-2 flex-grow">
                        {relatedBlog.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedBlog.description}</p>

                      <div className="text-xs text-gray-500">
                        {new Date(relatedBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FOOTER */}
      <section className="bg-gradient-to-r from-[#7c5cbf] to-purple-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Want to share your knowledge?</h2>
          <p className="text-purple-100 text-lg mb-8">Start publishing articles and join our community of tech leaders.</p>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg"
          >
            Write Your First Article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* STRUCTURED DATA FOR SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: blog.title,
            description: blog.description,
            image: blog.image,
            author: {
              '@type': 'Person',
              name: blog.author || 'Admin',
            },
            datePublished: blog.createdAt,
            keywords: blog.tags.join(', '),
            articleBody: blog.content,
          }),
        }}
      />
    </main>
  );
}
