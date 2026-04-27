import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Section43 from "@/components/home/Section43";
import Sliderauto from "@/components/home/sliderauto";
import Model from "@/components/home/Model";
import DevSecSlider from "@/components/home/DevSecSlider";
import Blogs from "@/components/home/Blogs";
import OurProjects from "@/components/home/OurProjects";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Cont from "@/components/home/Cont";

export default function HomePage() {
    return (
        <>
            <Hero />
            <Sliderauto />
            <Section43 />
            <Model />
            <DevSecSlider />
            <OurProjects />
            <Blogs />
            <Testimonials />
            <Cont />
            <FAQ />
        </>
    );
}
