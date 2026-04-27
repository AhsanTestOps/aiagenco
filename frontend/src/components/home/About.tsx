"use client";

import { useState } from "react";
<<<<<<< HEAD
import Cont from "./Cont";

const values = [
  {
    title: "Innovation",
    body: "We are constantly exploring new technologies and methodologies to stay ahead of the curve. Innovation is at the heart of everything we do, driving us to develop creative and effective solutions for our clients.",
  },
  {
    title: "Quality",
    body: "We are committed to delivering the highest quality in everything we build. From code to design, every detail is refined to meet and exceed client expectations.",
  },
  {
    title: "Customer-Centric Approach",
    body: "Our clients are at the core of every decision we make. We listen, adapt, and tailor our solutions to ensure the best outcomes for each unique business challenge.",
  },
  {
    title: "Integrity",
    body: "We operate with transparency and honesty in all our interactions. Trust is the foundation of every partnership we build.",
  },
  {
    title: "Teamwork",
    body: "Great things are built together. Our collaborative culture brings diverse talent and perspectives to deliver solutions that are stronger as a whole.",
  },
];

const stats = [
  { num: "99.9", suffix: "%+", label: "Uptime Across Production" },
  { prefix: "$", num: "220M", suffix: "+", label: "Technology Driven Value" },
  { num: "650", suffix: "+", label: "Business Partnerships" },
  { num: "107", suffix: "+", label: "Global Markets" },
];
=======
import { useTranslation } from "react-i18next";
>>>>>>> e511a38f850a29e7d053c95efde841a065d72775

export default function About() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);

  const values = [
    {
      title: t("about_page.values.innovation_title"),
      body: t("about_page.values.innovation_body"),
    },
    {
      title: t("about_page.values.quality_title"),
      body: t("about_page.values.quality_body"),
    },
    {
      title: t("about_page.values.customer_centric_title"),
      body: t("about_page.values.customer_centric_body"),
    },
    {
      title: t("about_page.values.integrity_title"),
      body: t("about_page.values.integrity_body"),
    },
    {
      title: t("about_page.values.teamwork_title"),
      body: t("about_page.values.teamwork_body"),
    },
  ];

  const stats = [
    { num: "99.9", suffix: "%+", label: t("about_page.stats.uptime") },
    { prefix: "$", num: "220M", suffix: "+", label: t("about_page.stats.value") },
    { num: "650", suffix: "+", label: t("about_page.stats.partnerships") },
    { num: "107", suffix: "+", label: t("about_page.stats.markets") },
  ];

  return (
    <main className="w-full">

      {/* ── HERO ── */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white relative overflow-hidden">
        {/* subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,92,191,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,191,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <h1 
          className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight z-10"
          dangerouslySetInnerHTML={{ __html: t("about_page.hero_title") }}
        />
        <p className="mt-5 text-base text-gray-500 max-w-md leading-relaxed z-10">
          {t("about_page.hero_subtitle")}
        </p>
        <a
          href="#contact"
          className="mt-9 inline-flex items-center gap-3 bg-[#7c5cbf] text-white px-12 py-4 rounded-full font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-purple-200 z-10"
        >
          {t("about_page.hero_cta")}
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Cont />
        </div>
      </section>

      {/* ── ABOUT TECHSENTIAL ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            {t("about_page.about_section_title")}
          </h2>
          <p className="text-gray-500 leading-relaxed text-base">
            {t("about_page.about_section_text")}
          </p>
        </div>
        {/* Right image */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
            alt="office"
            className="w-full h-80 object-cover"
          />
          {/* purple tint overlay */}
          <div className="absolute inset-0 bg-purple-900/20 rounded-2xl pointer-events-none" />
        </div>
      </section>

      {/* ── OUR UNIQUE VALUES ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            {t("about_page.values_title")}
          </h2>
          <p className="text-gray-500 leading-relaxed text-base max-w-sm">
            {t("about_page.values_subtitle")}
          </p>
        </div>
        {/* Right — accordion */}
        <div className="flex flex-col gap-3">
          {values.map((v, i) => (
            <div
              key={i}
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="bg-[#0f1b3c] rounded-2xl px-7 py-5 cursor-pointer transition-colors duration-200 hover:bg-[#1a2a50]"
            >
              <h3 className="text-white font-bold text-base">{v.title}</h3>
              <div
                className={`text-white/70 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 mt-3" : "max-h-0"
                  }`}
              >
                {v.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#f0ede8] py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl px-7 py-8 shadow-sm"
            >
              <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {s.prefix && (
                  <span className="text-[#e07b3a]">{s.prefix}</span>
                )}
                {s.num}
                <span className="text-[#e07b3a]">{s.suffix}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}