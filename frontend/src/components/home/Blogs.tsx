// components/BlogsSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  readTime: string;
  author: string;
  authorInitials: string;
  authorImage?: string;
  date: string;
  tags: string[];
}

const AuthorAvatar = ({
  initials,
  color,
}: {
  initials: string;
  color: string;
}) => (
  <div
    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
    style={{ backgroundColor: color }}
  >
    {initials}
  </div>
);

const avatarColors: Record<string, string> = {
  AG: "#2d2d2d",
  MR: "#1a1a2e",
};

export default function BlogsSection() {
  const { t } = useTranslation();

  const blogs: Blog[] = [
    {
      id: 1,
      title: t("blogs_page.blogs.blog1_title"),
      slug: "/blog/chatgpt-vs-deepseek",
      image: "https://images.unsplash.com/photo-1690191863988-f685cddde463?w=500&auto=format&fit=crop&q=60",
      readTime: `3 ${t("blogs_page.read_time")}`,
      author: "Malik Fahad",
      authorInitials: "AG",
      date: "16-Apr-2025",
      tags: ["Machine Learning", "NLP"],
    },
    {
      id: 2,
      title: t("blogs_page.blogs.blog2_title"),
      slug: "/blog/machine-learning-ai",
      image: "https://images.unsplash.com/photo-1676276377440-c180867b1e47?w=500&auto=format&fit=crop&q=60",
      readTime: `2 ${t("blogs_page.read_time")}`,
      author: "Ahmed Bilal",
      authorInitials: "MR",
      date: "26-Mar-2025",
      tags: ["Architecture", "LLMs"],
    },
    {
      id: 3,
      title: t("blogs_page.blogs.blog3_title"),
      slug: "/blog/whitehat-seo-tips",
      image: "https://plus.unsplash.com/premium_photo-1726873342924-38a37c0d80be?w=500&auto=format&fit=crop&q=60",
      readTime: `3 ${t("blogs_page.read_time")}`,
      author: "Saad",
      authorInitials: "AG",
      date: "03-Mar-2025",
      tags: ["SEO", "Marketing"],
    },
  ];

  return (
    <section className="w-full bg-[#f0ebe3] px-4 md:px-10 lg:px-20 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-sm">
          {t("blogs.heading")}
        </h2>
        <div className="flex items-center gap-3 md:mt-4">
          <div className="w-10 h-px bg-gray-700" />
          <span className="text-sm font-semibold tracking-widest text-gray-700 uppercase">
            {t("blogs.label")}
          </span>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex flex-col group">
            {/* Image with Read Time Badge */}
            <Link href={blog.slug} className="relative block overflow-hidden rounded-2xl mb-5">
              <div className="relative w-full h-[260px]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              {/* Read time badge */}
              <span className="absolute top-4 right-4 bg-white text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                {blog.readTime}
              </span>
            </Link>

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
              <AuthorAvatar
                initials={blog.authorInitials}
                color={avatarColors[blog.authorInitials] ?? "#555"}
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-none mb-1">
                  {blog.author}
                </p>
                <p className="text-xs text-gray-500">{blog.date}</p>
              </div>
            </div>

            {/* Title with arrow */}
            <Link
              href={blog.slug}
              className="flex items-start justify-between gap-3 mb-4 group/title"
            >
              <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover/title:text-gray-600 transition-colors">
                {blog.title}
              </h3>
              <span className="text-gray-500 text-xl shrink-0 mt-0.5 group-hover/title:translate-x-1 transition-transform">
                →
              </span>
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-700 border border-gray-300 bg-white px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-14">
        <Link
          href="/blogs"
          className="bg-gray-900 hover:bg-gray-700 transition-colors text-white font-medium px-10 py-3.5 rounded-full text-sm"
        >
          {t("blogs.viewAll")}
        </Link>
      </div>
    </section>
  );
}