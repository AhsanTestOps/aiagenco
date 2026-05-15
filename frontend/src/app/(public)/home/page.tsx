import Hero from "@/components/home/Hero";
import Sliderauto from "@/components/home/sliderauto";
import Section43 from "@/components/home/Section43";
import Model from "@/components/home/Model";
import DevSecSlider from "@/components/home/DevSecSlider";
import OurProjects from "@/components/home/OurProjects";
import Blogs from "@/components/home/Blogs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Cont from "@/components/home/Cont";

export default function HomePage() {
    return (
        <>
            {/* Hero section - hidden on desktop */}
            <div className="hidden md:block">
                <Hero />
            </div>
            <Sliderauto />
            {/* Statistics section - hidden on desktop */}
            <div className="hidden md:block">
                <Section43 />
            </div>
            <Model />
            <DevSecSlider />
            <OurProjects />
            <Blogs />
            <Testimonials />
            {/* Contact section - hidden on desktop */}
            <div className="hidden md:block">
                <Cont />
            </div>
            <FAQ />
        </>
    );
}
