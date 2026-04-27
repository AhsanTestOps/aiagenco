// components/ProjectsSection.tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  bg: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Smart Travel Planner and Recommendation System",
    description:
      "Our smart travel planner is an AI-powered platform designed to make travel effortless. By simply entering your starting point and destination, the system provides tailored recommendations, optimal routes, and seamless booking options. It ensures a personalized, efficient, and stress-free travel experience for every user.",
    image: "/images/1.png",
    bg: "#dde3f0",
  },
  {
    id: 2,
    title: "SaaS Product",
    description:
      "Our ERP SaaS product is a cloud-based solution that simplifies and unifies business operations. It enables organizations to manage finances, track inventory, handle HR processes, and monitor performance through a single intuitive dashboard. With real-time analytics and automation, businesses can scale faster and operate more efficiently.",
    image: "/images/2.png",
    bg: "#ede9f6",
  },
  {
    id: 3,
    title: "RAG-Based AI HR Assistant System",
    description:
      "A RAG-based AI-powered HR agent designed to streamline and automate human resource operations. The system leverages Retrieval-Augmented Generation (RAG) to access and analyze data from internal databases and reference PDFs, enabling accurate and context-aware responses. It can process user prompts, retrieve relevant information, and assist with HR-related queries such as policies, employee data, and documentation. Built with an intelligent agentic architecture, the solution enhances decision-making, reduces manual effort, and improves overall efficiency in HR workflows.",
      image: "/images/3.png",
    bg: "#fce4ec",
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform designed to provide a seamless online shopping experience. Users can browse products, add items to their cart, and securely complete purchases. The system includes features such as product management, user authentication, and order tracking, ensuring smooth and efficient operations for both customers and administrators.",
    image: "/images/4.png",
    bg: "#e0f2f1",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, y }}
      className="sticky top-24 mb-8"
    >
      <div
        className="w-full rounded-3xl overflow-hidden flex flex-col md:flex-row min-h-[480px]"
        style={{ zIndex: index + 1 }}
      >
        {/* Image side */}
        <div
          className={`w-full md:w-[62%] relative overflow-hidden ${isEven ? "order-1" : "order-1 md:order-2"
            }`}
          style={{ minHeight: "380px" }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Content side */}
        <div
          className={`w-full md:w-[38%] flex flex-col justify-center px-10 py-12 ${isEven ? "order-2" : "order-2 md:order-1"
            }`}
          style={{ backgroundColor: project.bg }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-5">
            {t(`ourProjects.project${project.id}Title`)}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            {t(`ourProjects.project${project.id}Desc`)}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const { t } = useTranslation();
  return (
    <section className="w-full bg-white px-4 md:px-10 lg:px-20 py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            {t("ourProjects.heading")}
          </h2>
          <p className="text-gray-500 text-base leading-relaxed">
            {t("ourProjects.description")}
          </p>
        </div>
        <button className="bg-violet-600 hover:bg-violet-700 transition-colors text-white font-medium px-7 py-3 rounded-full flex items-center gap-2 whitespace-nowrap">
          {t("ourProjects.exploreMore")}
          <span className="text-lg">→</span>
        </button>
      </div>

      {/* Stacked scroll cards */}
      <div className="relative">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}