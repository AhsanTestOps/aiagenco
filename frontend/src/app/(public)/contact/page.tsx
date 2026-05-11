import { Metadata } from 'next'
import Cont from "@/components/home/Cont"

export const metadata: Metadata = {
  title: 'Contact Us | AIAgenco',
  description: 'Get in touch with the AIAgenco team. We respond within 24 hours. Available via email, WhatsApp, and our contact form.',
  alternates: {
    canonical: 'https://www.aiagenco.dev/contact',
  },
  openGraph: {
    title: 'Contact AIAgenco',
    description: 'Reach out to our team of AI and web development experts.',
    url: 'https://www.aiagenco.dev/contact',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <>
      <Cont />
    </>
  )
}
