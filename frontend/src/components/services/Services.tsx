"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      id: "01",
      title: t("services_page.services.ai_title"),
      tagline: t("services_page.services.ai_tagline"),
      description: t("services_page.services.ai_desc"),
      image:
        "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
      tags: ["LangChain", "OpenAI", "RAG", "Python"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="15" cy="10" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "02",
      title: t("services_page.services.web_title"),
      tagline: t("services_page.services.web_tagline"),
      description: t("services_page.services.web_desc"),
      image:
        "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&q=80",
      tags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
          <path d="M7 8l3 3-3 3M13 14h4" />
        </svg>
      ),
    },
    {
      id: "03",
      title: t("services_page.services.cloud_title"),
      tagline: t("services_page.services.cloud_tagline"),
      description: t("services_page.services.cloud_desc"),
      image:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
      tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 15a4 4 0 0 0 4 4h10a4 4 0 0 0 1-7.9A5 5 0 1 0 5.6 10 4 4 0 0 0 3 15z" />
        </svg>
      ),
    },
    {
      id: "04",
      title: t("services_page.services.qa_title"),
      tagline: t("services_page.services.qa_tagline"),
      description: t("services_page.services.qa_desc"),
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
      tags: ["Cypress", "Jest", "Selenium", "Postman"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      id: "05",
      title: t("services_page.services.design_title"),
      tagline: t("services_page.services.design_tagline"),
      description: t("services_page.services.design_desc"),
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
      tags: ["Figma", "Framer", "Tailwind", "Motion"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      ),
    },
    {
      id: "06",
      title: t("services_page.services.marketing_title"),
      tagline: t("services_page.services.marketing_tagline"),
      description: t("services_page.services.marketing_desc"),
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tags: ["SEO", "Google Ads", "Analytics", "Content"],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
  ];

  const process = [
    { step: "01", title: t("services_page.process.discovery_title"), desc: t("services_page.process.discovery_desc") },
    { step: "02", title: t("services_page.process.strategy_title"), desc: t("services_page.process.strategy_desc") },
    { step: "03", title: t("services_page.process.build_title"), desc: t("services_page.process.build_desc") },
    { step: "04", title: t("services_page.process.launch_title"), desc: t("services_page.process.launch_desc") },
  ];

  const active = services[activeService];

  return (
    <main className="w-full bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-white">
        {/* subtle grid — same as About */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(124,92,191,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,191,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <h1 
          className="relative z-10 text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight max-w-4xl"
          dangerouslySetInnerHTML={{ __html: t("services_page.hero_title") }}
        />
        <p className="relative z-10 mt-5 text-base text-gray-500 max-w-md leading-relaxed">
          {t("services_page.hero_subtitle")}
        </p>
        <a
          href="#services-grid"
          className="relative z-10 mt-9 inline-flex items-center gap-3 bg-[#7c5cbf] text-white px-12 py-4 rounded-full font-semibold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-purple-200"
        >
          {t("services_page.hero_cta")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </section>

      {/* ── INTERACTIVE SERVICE SHOWCASE ── */}
      <section id="services-grid" className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <span className="text-purple-600 text-sm font-semibold tracking-widest uppercase">{t("services_page.showcase_subtitle")}</span>
          <h2 
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-3"
            dangerouslySetInnerHTML={{ __html: t("services_page.showcase_title") }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left — service list */}
          <div className="flex flex-col gap-3">
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveService(i)}
                className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-200 group ${activeService === i
                  ? "bg-[#0b1220] border-purple-600/50 shadow-lg shadow-purple-900/20"
                  : "bg-gray-50 border-gray-100 hover:border-purple-200 hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors duration-200 ${activeService === i ? "bg-purple-600/20 text-purple-400" : "bg-white text-gray-500 group-hover:text-purple-600"
                    }`}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold text-base transition-colors ${activeService === i ? "text-white" : "text-gray-900"}`}>
                        {s.title}
                      </h3>
                      <span className={`text-xs font-mono font-bold ${activeService === i ? "text-purple-400" : "text-gray-300"}`}>
                        {s.id}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 transition-colors ${activeService === i ? "text-gray-400" : "text-gray-500"}`}>
                      {s.tagline}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right — active service detail */}
          <div className="lg:sticky lg:top-28">
            <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/60">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/40 to-transparent" />
                <span className="absolute bottom-5 left-6 text-white text-2xl font-extrabold">
                  {active.title}
                </span>
                <span className="absolute top-5 right-5 text-4xl font-black text-white/10 font-mono">
                  {active.id}
                </span>
              </div>
              <div className="bg-white px-7 py-7">
                <p className="text-gray-600 leading-relaxed text-sm">
                  {active.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-100 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#7c5cbf] hover:gap-3 transition-all duration-200"
                >
                  {t("ourProjects.exploreMore")}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-[#0b1220] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">{t("services_page.process_subtitle")}</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-3">
              {t("services_page.process_title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <div key={i} className="relative bg-white/5 border border-white/10 rounded-2xl px-6 py-8 hover:border-purple-500/40 transition-colors duration-200">
                {/* connector line */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-purple-600/40 z-10" />
                )}
                <span className="text-5xl font-black text-purple-600/20 font-mono leading-none">{p.step}</span>
                <h3 className="text-white font-bold text-lg mt-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mt-2">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            {t("services_page.cta_title")}
          </h2>
          <p className="mt-5 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            {t("services_page.cta_subtitle")}
          </p>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-3 bg-[#0b1220] text-white px-12 py-4 rounded-full font-bold text-sm hover:bg-black transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
          >
            {t("services_page.cta_btn")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

    </main>
  );
}