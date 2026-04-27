"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { siteDetails } from '@/data/common/siteDetails';
import { footerDetails } from '@/data/layout/footer';
import { getPlatformIconByName } from '@/utils';
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
    const { t } = useTranslation();
    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 w-fit">
                        <Image 
                            src={siteDetails.siteLogo} 
                            alt={siteDetails.siteName} 
                            width={160} 
                            height={40} 
                            className="w-auto h-8 md:h-10 object-contain"
                        />
                    </Link>
                    <p className="mt-3.5 text-foreground-accent">
                        {t("footer.subheading")}
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">{t("footer.quickLinks")}</h4>
                    <ul className="text-foreground-accent">
                        {footerDetails.quickLinks.map(link => (
                            <li key={link.text} className="mb-2">
                                <Link href={link.url} className="hover:text-foreground">{t(`footer.${link.text.toLowerCase()}`)}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-4">{t("footer.contactUs")}</h4>

                    {footerDetails.email && <a href={`mailto:${footerDetails.email}`} className="block text-foreground-accent hover:text-foreground">Email: {footerDetails.email}</a>}

                    {footerDetails.telephone && <a href={`tel:${footerDetails.telephone}`} className="block text-foreground-accent hover:text-foreground">Phone: {footerDetails.telephone}</a>}

                    {footerDetails.socials && (
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {Object.keys(footerDetails.socials).map(platformName => {
                                if (platformName && footerDetails.socials[platformName]) {
                                    return (
                                        <Link
                                            href={footerDetails.socials[platformName]}
                                            key={platformName}
                                            aria-label={platformName}
                                        >
                                            {getPlatformIconByName(platformName)}
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 md:text-center text-foreground-accent px-6">

            </div>
        </footer>
    );
};

export default Footer;
