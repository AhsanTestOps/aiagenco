"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { stats } from "@/data/home/Section43";
import { useTranslation } from "react-i18next";





const Section43 = () => {
    const { t } = useTranslation();
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    return (
        <section
            ref={ref}
            className="w-full bg-[#050d18] text-white py-16 px-6 md:px-16 relative overflow-hidden"
        >
            {/* ===== FULL BG GRID ===== */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:80px_80px] [background-position:center_center]" />
                {/* Fade top */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent" />
                {/* Fade bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent" />
                {/* Fade left */}
                <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent" />
                {/* Fade right */}
                <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent" />
            </div>



            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 relative z-10 justify-items-center text-center">
                {stats.map((stat, index) => (
                    <div key={stat.id} className="relative flex flex-col gap-3 max-w-[250px]">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
                            {inView ? (
                                <CountUp
                                    start={0}
                                    end={stat.number}
                                    duration={2.5}
                                    delay={index * 0.2}
                                    separator=""
                                />
                            ) : (
                                stat.number
                            )}
                            {stat.plus && <span>+</span>}
                            {stat.suffix && <span>{stat.suffix}</span>}
                        </h2>
                        <p className="text-base font-semibold text-white">
                            {t(`section43.${stat.id === 1 ? 'year' : stat.id === 2 ? 'projects' : stat.id === 3 ? 'clients' : 'inWork'}Title`)}
                        </p>
                        <p className="text-sm text-gray-400">
                            {t(`section43.${stat.id === 1 ? 'year' : stat.id === 2 ? 'projects' : stat.id === 3 ? 'clients' : 'inWork'}Subtitle`)}
                        </p>
                        {stat.images && (
                            <div className="flex items-center mt-1">
                                {stat.images.map((src, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border-2 border-black overflow-hidden"
                                        style={{ marginLeft: i !== 0 ? "-10px" : "0" }}
                                    >
                                        <Image
                                            src={src}
                                            alt={`${stat.title} image ${i + 1}`}
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover"
                                            unoptimized
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section43;