"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", name: "EN" },
    { code: "tr", name: "TR" },
    { code: "ar", name: "AR" },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        if (typeof document !== "undefined") {
            document.documentElement.dir = code === "ar" ? "rtl" : "ltr";
            document.documentElement.lang = code;
        }
    };

    // Ensure document direction is correct on initial load if language is stored/detected
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
            document.documentElement.lang = i18n.language;
        }
    }, [i18n.language]);

    return (
        <div className="flex items-center gap-1 bg-gray-100/80 backdrop-blur-sm p-1 rounded-full border border-gray-200/50">
            {languages.map((lang) => {
                const isActive = i18n.language === lang.code || i18n.language?.startsWith(lang.code);
                return (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all duration-300 ${isActive
                            ? "bg-[#0b1220] text-white shadow-sm scale-105"
                            : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
                            }`}
                    >
                        {lang.name}
                    </button>
                );
            })}
        </div>
    );
}