'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import I18nProvider from '@/components/common/I18nProvider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <Header />
      <main>{children}</main>
      <WhatsAppButton />
      <Footer />
    </I18nProvider>
  );
}
