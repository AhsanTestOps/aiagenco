import type { Metadata } from "next";
import Services from "@/components/services/Services";
import { siteDetails } from "@/data/common/siteDetails";

export const metadata: Metadata = {
    title: "Our Services | AIAgenco — AI Agents & Web Development",
    description: "AIAgenco offers custom AI agent development, Next.js web applications, QA automation, RAG systems, and intelligent automation solutions for modern businesses.",
    alternates: {
        canonical: '/services',
    },
    openGraph: {
        title: "Our Services | AIAgenco",
        description: "AIAgenco offers custom AI agent development, Next.js web applications, QA automation, and intelligent automation solutions.",
        url: `${siteDetails.siteUrl}services`,
        type: "website",
    },
};

export default function ServicesPage() {
    return (
        <>
            <Services />
        </>
    );
}
