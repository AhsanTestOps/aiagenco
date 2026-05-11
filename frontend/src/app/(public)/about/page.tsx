import type { Metadata } from "next";
import About from "@/components/home/About";
import { siteDetails } from "@/data/common/siteDetails";

export const metadata: Metadata = {
    title: "About Us | AIAgenco — AI Agency & Automation",
    description: "Learn about AIAgenco's mission, team, and expertise in AI agents, automation, and web development. Discover how we transform businesses with intelligent solutions.",
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: "About Us | AIAgenco",
        description: "Learn about AIAgenco's mission, team, and expertise in AI agents, automation, and web development.",
        url: `${siteDetails.siteUrl}about`,
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <>
            <About />
        </>
    );
}
