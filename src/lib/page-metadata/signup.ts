import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Signup",
    description: "Create a new account to access exclusive features and manage your preferences.",
    openGraph: {
        title: "Signup",
        description: "Create a new account to access exclusive features and manage your preferences.",
        type: "website",
        url: "https://www.yoursite.com/signup",
        images: [
            {
                url: "https://www.yoursite.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Signup Page Preview",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        title: "Signup",
        description: "Create a new account to access exclusive features and manage your preferences.",
        images: ["https://www.yoursite.com/og-image.jpg"],
    },
};
