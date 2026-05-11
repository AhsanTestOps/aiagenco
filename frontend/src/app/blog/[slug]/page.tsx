import type { Metadata } from "next";
import BlogDetail from '@/components/blogs/BlogDetail';

export const metadata: Metadata = {
    title: "Blog Article | AIAgenco",
    description: "Read the latest article from AIAgenco about AI, automation, and technology insights.",
    robots: "index, follow",
};

export default function BlogDetailPage() {
  return <BlogDetail />;
}
