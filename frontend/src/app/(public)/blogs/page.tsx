import type { Metadata } from "next";
import DynamicBlogs from "@/components/blogs/DynamicBlogs";
import { siteDetails } from "@/data/common/siteDetails";

export const metadata: Metadata = {
    title: "Blog | AIAgenco — AI & Tech Insights",
    description: "Read the latest articles on AI agents, machine learning, automation, web development, and digital transformation from the AIAgenco team.",
    alternates: {
        canonical: '/blogs',
    },
    openGraph: {
        title: "Blog | AIAgenco",
        description: "Read insights and articles on AI agents, automation, and digital transformation from the AIAgenco team.",
        url: `${siteDetails.siteUrl}blogs`,
        type: "website",
    },
};

export default function BlogPage() {
    return (
        <DynamicBlogs />
    );
}
