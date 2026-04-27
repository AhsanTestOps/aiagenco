"use client";

import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark, HiBars3 } from "react-icons/hi2";

import Container from "@/components/common/Container";
import { siteDetails } from "@/data/common/siteDetails";
import { menuItems } from "@/data/layout/menuItems";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 w-full">
      <Container className="!px-0 !max-w-full">
        <nav className="shadow-md md:shadow-none bg-white md:bg-transparent flex items-center justify-between py-6 px-4 md:px-12 md:py-10 relative w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10 transition-transform hover:scale-105">
            <Image 
              src={siteDetails.siteLogo} 
              alt={siteDetails.siteName} 
              width={160} 
              height={40} 
              className="w-auto h-8 md:h-10 object-contain"
              priority
            />
          </Link>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-0">
            <ul className="flex items-center space-x-10 text-lg font-bold bg-white/40 backdrop-blur-xl px-10 py-3.5 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/20">
              {menuItems.map((item) => (
                <li key={item.text}>
                  <Link
                    href={item.url}
                    className="text-gray-800 hover:text-purple-600 transition-all duration-300 relative group"
                  >
                    {t(`nav.${item.text.toLowerCase()}`)}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-6 z-10">
            <LanguageSwitcher />
            <div className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm border border-gray-100 flex items-center">
              <Link
                href="/about"
                className="bg-[#0b1220] text-white px-7 py-2.5 rounded-full flex items-center gap-3 font-bold hover:bg-black transition-all duration-300 group"
              >
                <span className="text-[17px] tracking-tight">{t("nav.contact")}</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </div>
          </div>

          {/* Mobile: Language Switcher + Hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiOutlineXMark className="h-6 w-8" aria-hidden="true" />
              ) : (
                <HiBars3 className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu with Transition */}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
          <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
            {menuItems.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.url}
                  className="text-foreground hover:text-primary block"
                  onClick={toggleMenu}
                >
                  {t(`nav.${item.text.toLowerCase()}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/about"
                className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit"
                onClick={toggleMenu}
              >
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </header>
  );
};

export default Header;