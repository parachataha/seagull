import { Metadata } from "next";

export const metadata : Metadata = {
    title: "Login",
    description: "Sign in to access your account and manage your preferences.",
    openGraph: {
        title: "Login",
        description: "Sign in to access your account and manage your preferences.",
        type: "website",
        url: "https://www.yoursite.com/login",
        images: [
            {
                url: "https://www.yoursite.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Login Page Preview",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        site: "@yourtwitterhandle",
        creator: "@yourtwitterhandle",
        title: "Login",
        description: "Sign in to access your account and manage your preferences.",
        images: ["https://www.yoursite.com/og-image.jpg"],
    },
};
