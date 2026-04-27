"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { brands } from "@/data/home/sliderauto";

import "swiper/css";

const AutoSlider = () => {
    const duplicated = [...brands, ...brands, ...brands, ...brands];

    return (
        <section className="w-full py-6 bg-white border-y border-gray-100">
            <div
                className="relative overflow-hidden"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
            >
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    speed={2500}
                    loop={true}
                    loopAdditionalSlides={10}
                    slidesPerView="auto"
                    spaceBetween={50}
                    allowTouchMove={true}
                    grabCursor={true}
                    centeredSlides={false}
                >
                    {duplicated.map((brand, index) => (
                        <SwiperSlide
                            key={`${brand.id}-${index}`}
                            style={{ width: "auto" }}
                            className="!flex items-center justify-center"
                        >
                            {/* ✅ Removed opacity-50 — was causing blur/washed out look */}
                            <div className="cursor-pointer px-6 py-2 flex items-center justify-center">
                                <Image
                                    src={brand.src}
                                    alt={brand.name}
                                    width={brand.width}
                                    height={brand.height}
                                    quality={100}
                                    className="h-12 w-auto object-contain"
                                    unoptimized
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default AutoSlider;