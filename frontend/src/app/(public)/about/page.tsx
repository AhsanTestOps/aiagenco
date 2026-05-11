import type { Metadata } from "next";
import About from "@/components/home/About";
import { siteDetails } from "@/data/common/siteDetails";

export const metadata: Metadata = {
    title: "About | AIAgenco",
    description: "Learn about AIAgenco — your AI agency partner for automation and intelligent workflows.",
    openGraph: {
        title: "About | AIAgenco",
        description: "Learn about AIAgenco — your AI agency partner for automation and intelligent workflows.",
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
