"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useTranslation } from "react-i18next";


const techs = [
    {
        name: "Python",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
        name: "AWS",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    },
    {
        name: "Next.js",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
        name: "React",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
        name: "NestJS",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg",
    },
    {
        name: "Docker",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
        name: "TypeScript",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
        name: "PostgreSQL",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
];

export default function DevSecSlider() {
    const { t } = useTranslation();
    return (
        <section className="bg-[#0d1117] px-8 py-12">
            {/* Header */}
            <div className="flex justify-between items-start mb-10 gap-8">
                <h2 className="text-white text-4xl font-semibold">{t("techStack.heading")}</h2>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                    {t("techStack.description")}
                </p>
            </div>

            {/* Swiper Slider */}
            <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={16}
                loop={true}
                speed={3000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                }}
                allowTouchMove={false}
            >
                {[...techs, ...techs].map((tech, i) => (
                    <SwiperSlide key={i} style={{ width: "140px" }}>
                        <div className="bg-[#1a2035] rounded-xl w-[140px] h-[100px] flex items-center justify-center p-4">
                            <Image
                                src={tech.src}
                                alt={tech.name}
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}