"use client";

import { useTranslation } from "react-i18next";
import Hero from "@/components/home/Hero";
import AutoSlider from "@/components/home/sliderauto";
import Section43 from "@/components/home/Section43";
import Model from "@/components/home/Model";
import DevSecSlider from "@/components/home/DevSecSlider";
import OurProjects from "@/components/home/OurProjects";
import Blogs from "@/components/home/Blogs";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing/Pricing";
import About from "@/components/home/About";
import Services from "@/components/services/Services";
import FAQ from "@/components/home/FAQ";
import Benefits from "@/components/home/Benefits/Benefits";
import Container from "@/components/common/Container";
import Section from "@/components/common/Section";
import CTA from "@/components/home/CTA";
import ContactUs from "@/components/contact-us/ContactUs";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <AutoSlider />
      <Section43 />
      <Model />
      <DevSecSlider />
      <OurProjects />
      <Blogs />
      <About />
      <Services />
      <ContactUs />
      <Container>
        <Benefits />

        <Section
          id="pricing"
          title={t("pricing.title")}
          description={t("pricing.description")}
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title={t("testimonials.title")}
          description={t("testimonials.description")}
        >
          <Testimonials />
        </Section>

        <FAQ />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
