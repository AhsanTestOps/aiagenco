import type { Metadata } from "next";
import BlogDetail from '@/components/blogs/BlogDetail';

export const metadata: Metadata = {
    title: "Blog Article | AIAgenco — AI & Tech Insights",
    description: "Discover expert insights on AI agents, automation, machine learning, and digital transformation solutions from AIAgenco.",
    robots: "index, follow",
};

export default function BlogDetailPage() {
  return <BlogDetail />;
}
