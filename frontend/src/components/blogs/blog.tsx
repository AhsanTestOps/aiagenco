"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Container from "@/components/common/Container";

export default function BlogsPageContent() {
  const { t } = useTranslation();

  const blogs = [
    {
      id: 1,
      title: t("blogs_page.blogs.blog1_title"),
      slug: "chatgpt-vs-deepseek",
      description: t("blogs_page.blogs.blog1_desc"),
      image: "https://images.unsplash.com/photo-1690191863988-f685cddde463?w=800&auto=format&fit=crop&q=80",
      readTime: `3 ${t("blogs_page.read_time")}`,
      author: "Malik Fahad",
      authorInitials: "MF",
      date: "16-Apr-2025",
      tags: ["Machine Learning", "NLP"],
    },
    {
      id: 2,
      title: t("blogs_page.blogs.blog2_title"),
      slug: "machine-learning-ai",
      description: t("blogs_page.blogs.blog2_desc"),
      image: "https://images.unsplash.com/photo-1676276377440-c180867b1e47?w=800&auto=format&fit=crop&q=80",
      readTime: `2 ${t("blogs_page.read_time")}`,
      author: "Ahmed Bilal",
      authorInitials: "AB",
      date: "26-Mar-2025",
      tags: ["Architecture", "LLMs"],
    },
    {
      id: 3,
      title: t("blogs_page.blogs.blog3_title"),
      slug: "whitehat-seo-tips",
      description: t("blogs_page.blogs.blog3_desc"),
      image: "https://plus.unsplash.com/premium_photo-1726873342924-38a37c0d80be?w=800&auto=format&fit=crop&q=80",
      readTime: `3 ${t("blogs_page.read_time")}`,
      author: "Saad",
      authorInitials: "S",
      date: "03-Mar-2025",
      tags: ["SEO", "Marketing"],
    },
  ];

  const avatarColors: Record<string, string> = {
    MF: "#4F46E5",
    AB: "#10B981",
    S: "#F59E0B",
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero — matches Services page exactly ── */}
      <section className="relative pt-44 pb-40 bg-white overflow-hidden">
        {/* Grid background — same as services */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <Container>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Title — same huge bold font as "Services Built for Real Impact." */}
            <h1 
              className="text-6xl md:text-8xl font-black text-[#0f0f1a] leading-[0.9] tracking-tighter mb-8"
              dangerouslySetInnerHTML={{ __html: t("blogs_page.hero_title") }}
            />

            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium mb-10">
              {t("blogs_page.hero_subtitle")}
            </p>

            {/* CTA button — same pill style as "Explore Services" */}
            <Link
              href="#blogs"
              className="inline-flex items-center gap-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 text-base shadow-lg shadow-purple-500/20"
            >
              {t("blogs_page.hero_cta")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Blogs Grid ── */}
      <section id="blogs" className="py-24 bg-[#FAFAFA]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                {/* Image */}
                <Link href={`/blogs/${blog.slug}`} className="relative h-64 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                    {blog.readTime}
                  </span>
                </Link>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white shadow-sm shrink-0"
                      style={{ backgroundColor: avatarColors[blog.authorInitials] ?? "#555" }}
                    >
                      {blog.authorInitials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 leading-none">{blog.author}</span>
                      <span className="text-xs text-gray-400 mt-1">{blog.date}</span>
                    </div>
                  </div>

                  <Link href={`/blogs/${blog.slug}`} className="block mb-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-[#7c3aed] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6">
                    {blog.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/blogs/${blog.slug}`} className="text-gray-900 hover:text-[#7c3aed] transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

    </div>
  );
}