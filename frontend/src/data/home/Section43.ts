export interface Stat {
    id: number;
    number: number;
    suffix?: string;
    title: string;
    subtitle: string;
    images?: string[];
    plus?: boolean;
}

export const stats: Stat[] = [
    {
        id: 1,
        number: 2014,
        title: "Year of establishment",
        subtitle: "More than 10 years in the field",
        plus: true,
    },
    {
        id: 2,
        number: 304,
        title: "Projects are launched",
        subtitle: "A lot of projects are done",
        plus: true,
    },
    {
        id: 3,
        number: 189,
        title: "Clients are satisfied",
        subtitle: "These people love us",
        plus: true,
    },
    {
        id: 4,
        number: 12,
        title: "Projects in work",
        subtitle: "What we do right now",
        plus: true,
    },
];