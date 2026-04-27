"use client";

import React from "react";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTranslation } from "react-i18next";

import { heroDetails } from "@/data/home/hero";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section
      id="hero"
      className="relative pt-32 md:pt-40 pb-0 px-5 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
      </div>

      {/* Bottom fade */}
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-white/40 to-white"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content: Text + Animation */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground tracking-tight">
              {t("hero.heading")}
            </h1>
          </div>

          {/* Right: Lottie Animation */}
          <div className="flex justify-center md:justify-end">
            <DotLottieReact
              src="https://lottie.host/7bc61703-2a6a-47b1-b8d5-79c1bf268031/FVIkFra7fX.lottie"
              loop
              autoplay
              className="w-full max-w-[720px] min-h-[420px]"
            />
          </div>
        </div>
      </div>

      {/* Full Width Dashboard Section */}
      <div className="mt-10 sm:mt-12 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] hidden md:block ">
        <div className="flex justify-center items-center relative w-full">
          {/* Glass background - base layer - Now covering full width */}
          <Image
            src={heroDetails.centerImageSrc}
            width={3500}
            height={800}
            quality={100}
            priority
            unoptimized={true}
            alt="glass background"
            className="w-full h-auto drop-shadow-xl object-cover scale-110 md:scale-100"
          />

          {/* Dashboard - centered and sitting on the glass bg */}
          <div className="absolute inset-0 flex items-end justify-center pb-0 z-10 px-4 md:px-0">
            <Image
              src={heroDetails.centerImageSrc2}
              width={1400}
              height={500}
              quality={100}
              priority
              unoptimized={true}
              alt="dashboard"
              className="w-full max-w-7xl h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 rounded-xl md:rounded-2xl"
            />
          </div>
          
          {/* Reflection Effect */}
          <div
            className="absolute left-0 right-0 w-full overflow-hidden"
            style={{
              height: "100px",
              bottom: "-100px",
              transform: "scaleY(-1)",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 100%)",
            }}
          ></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Future Images Section */}
        {/* 
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8">
          <Image src="..." alt="image 1" />
          <Image src="..." alt="image 2" />
          <Image src="..." alt="image 3" />
        </div>
        */}
      </div>
    </section>
  );
};

export default Hero;
