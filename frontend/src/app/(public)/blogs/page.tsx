import type { Metadata } from "next";
import DynamicBlogs from "@/components/blogs/DynamicBlogs";
import { siteDetails } from "@/data/common/siteDetails";

export const metadata: Metadata = {
    title: "Blog | AIAgenco",
    description: "Read insights, tips, and industry updates from the AIAgenco team about AI, automation, and digital transformation.",
    openGraph: {
        title: "Blog | AIAgenco",
        description: "Read insights, tips, and industry updates from the AIAgenco team about AI, automation, and digital transformation.",
        url: `${siteDetails.siteUrl}blogs`,
        type: "website",
    },
};

export default function BlogPage() {
    return (
        <DynamicBlogs />
    );
}
