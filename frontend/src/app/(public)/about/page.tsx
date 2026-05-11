import { Metadata } from 'next';
import About from "@/components/home/About";

export const metadata: Metadata = {
  title: 'About AIAgenco | AI Agency & Web Development Team',
  description: 'AIAgenco is a team of AI engineers, web developers, and QA specialists building custom AI agents, RAG systems, and high-performance web applications for businesses worldwide.',
  alternates: {
    canonical: 'https://www.aiagenco.dev/about',
  },
  openGraph: {
    title: 'About AIAgenco | AI Agency & Web Development Team',
    description: 'Meet the team behind AIAgenco — AI engineers and web developers building intelligent automation for modern businesses.',
    url: 'https://www.aiagenco.dev/about',
    type: 'website',
  },
};

export default function AboutPage() {
    return (
        <>
            <About />
        </>
    );
}
