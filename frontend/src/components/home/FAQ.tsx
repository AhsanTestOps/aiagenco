"use client"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BiMinus, BiPlus } from "react-icons/bi";

import SectionTitle from "@/components/common/SectionTitle";
import { faqs } from "@/data/home/faq";
import { useTranslation } from "react-i18next";

const FAQ: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section id="faq" className="py-10 lg:py-20 max-w-5xl mx-auto">
            <div className="flex flex-col gap-16 items-center text-center">
                <div className="max-w-2xl">
                    <p className="text-foreground-accent uppercase tracking-wider font-semibold text-sm">{t("faq.label")}</p>
                    <SectionTitle>
                        <h2 className="my-4 !leading-tight text-4xl lg:text-5xl font-bold text-foreground">{t("faq.heading")}</h2>
                    </SectionTitle>
                    <p className="text-lg text-foreground-accent">
                        {t("faq.askUs")}
                    </p>
                    <a href="mailto:help@aiagenco.com" className="mt-4 block text-2xl lg:text-3xl text-secondary font-bold hover:scale-105 transition-transform duration-300">help@aiagenco.com</a>
                </div>

                <div className="w-full border-b">
                    {faqs.map((faq, index) => (
                        <div key={index} className="overflow-hidden">
                            <Disclosure>
                                {({ open }) => (
                                    <>
                                        <DisclosureButton className="flex items-center justify-between w-full px-6 py-8 text-left border-t group transition-colors hover:bg-gray-50/50">
                                            <span className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-secondary transition-colors">{t(`faq.q${index + 1}`)}</span>
                                            <div className={`p-2 rounded-full transition-all duration-300 ${open ? 'bg-secondary text-white' : 'bg-gray-100 text-secondary'}`}>
                                                {open ? <BiMinus className="w-6 h-6" /> : <BiPlus className="w-6 h-6" />}
                                            </div>
                                        </DisclosureButton>
                                        <DisclosurePanel className="px-6 pb-8 text-lg text-foreground-accent leading-relaxed bg-gray-50/30">
                                            {t(`faq.a${index + 1}`)}
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;