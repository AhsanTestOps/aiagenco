import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Basic SEO',
        price: 100,
        features: [
            'SEO audit & keyword research',
            'On-page optimization',
            'Meta tags optimization',
            'Monthly performance report',
        ],
    },
    {
        name: 'Advanced SEO',
        price: 200,
        features: [
            'Advanced keyword & competitor research',
            'On-page + technical SEO',
            'Content optimization (up to 5 pages)',
            'Bi-weekly performance reports',
        ],
    },
    {
        name: 'Premium SEO',
        price: 500,
        features: [
            'Full SEO strategy & execution',
            'High-quality backlink building',
            'Content & conversion optimization',
            'Weekly reports + dedicated support',
        ],
    },
];