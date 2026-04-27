"use client";

import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { IPricing } from "@/types";
import { useTranslation } from "react-i18next";

interface Props {
    tier: IPricing;
    highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
    const { t } = useTranslation();
    const { name } = tier;

    // determine index for translation based on name
    const tIndex = name === "Starter" ? 1 : name === "Pro" ? 2 : 3;

    return (
        <div className={clsx("w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 lg:max-w-full", { "shadow-lg": highlight })}>
            <div className="p-6 border-b border-gray-200 rounded-t-xl">
                <h3 className="text-2xl font-semibold mb-4">{t(`pricing.tier${tIndex}Name`)}</h3>
                <p className="text-3xl md:text-5xl font-bold mb-6">
                    <span className={clsx({ "text-secondary": highlight })}>
                        {t(`pricing.tier${tIndex}Price`) !== "Custom" ? `$${t(`pricing.tier${tIndex}Price`)}` : t(`pricing.tier${tIndex}Price`)}
                    </span>
                    {t(`pricing.tier${tIndex}Price`) !== "Custom" && <span className="text-lg font-normal text-gray-600">/mo</span>}
                </p>
                <button className={clsx("w-full py-3 px-4 rounded-full transition-colors", { "bg-primary hover:bg-primary-accent": highlight, "bg-hero-background hover:bg-gray-200": !highlight })}>
                    {t("pricing.cta")}
                </button>
            </div>
            <div className="p-6 mt-1">
                <p className="font-bold mb-0">FEATURES</p>
                <p className="text-foreground-accent mb-5">Everything in basic, plus...</p>
                <ul className="space-y-4 mb-8">
                    {(t(`pricing.tier${tIndex}Features`, { returnObjects: true }) as string[]).map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <BsFillCheckCircleFill className="h-5 w-5 text-secondary mr-2" />
                            <span className="text-foreground-accent">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingColumn