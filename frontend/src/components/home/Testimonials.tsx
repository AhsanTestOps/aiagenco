"use client";

import React from 'react';
import Image from 'next/image';
import { testimonials } from '@/data/home/testimonials';
import { useTranslation } from "react-i18next";

const Testimonials: React.FC = () => {
    const { t } = useTranslation();
    return (
        <section className="w-full py-16">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-secondary mb-4">What Our Clients Say</h2>
                <p className="text-foreground-accent text-lg">Hear from those who have partnered with us.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-lg mx-auto lg:max-w-full mt-4">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="flex flex-col flex-1 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
                    >
                        <div className="flex items-center mb-4 w-full justify-center lg:justify-start">
                            <Image
                                src={testimonial.avatar}
                                alt={`${testimonial.name} avatar`}
                                width={50}
                                height={50}
                                className="rounded-full shadow-md"
                            />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-secondary">{t(`testimonials.item${index + 1}Name`)}</h3>
                                <p className="text-sm text-foreground-accent">{t(`testimonials.item${index + 1}Role`)}</p>
                            </div>
                        </div>
                        <p className="text-foreground-accent text-center lg:text-left mt-auto">&quot;{t(`testimonials.item${index + 1}Message`)}&quot;</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;