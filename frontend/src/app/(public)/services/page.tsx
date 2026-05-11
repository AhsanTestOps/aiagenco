import type { Metadata } from "next";
import Services from "@/components/services/Services";
import { siteDetails } from "@/data/common/siteDetails";

export const metadata: Metadata = {
    title: "Services | AIAgenco",
    description: "Explore AIAgenco's comprehensive AI and technology services designed to transform your business and drive innovation.",
    openGraph: {
        title: "Services | AIAgenco",
        description: "Explore AIAgenco's comprehensive AI and technology services designed to transform your business and drive innovation.",
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
