import "../styles/globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import ReduxProvider from './redux/ReduxProvider';
import Navbar from '@/components/layout/Navbar';
import { Metadata, Viewport } from 'next';
import UserProvider from '@/components/providers/UserProvider';
import Container from '@/components/layout/Container';

import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from "sonner";

interface RootLayoutProps {
  children: React.ReactNode;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#C37F57',
}

export const metadata: Metadata = {
  applicationName: 'Seagull',
  title: "Seagull - Your Number One Blog Creator",
  description: "Unleash your creativity with our very own blog editor.",
  openGraph: {
      title: "Your Number One Blog Creator",
      description: "Unleash your creativity with our very own blog editor.",
      type: "article",
      images: [
        "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MWnZ8mE8Lqfva2GSmjTdkc6XKhlbV5tZUsYoNz",
      ],
  },
  twitter: {
      card: "summary_large_image",
      title: "Your Number One Blog Creator",
      description: "Unleash your creativity with our very own blog editor.",
      images: [
        "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MWnZ8mE8Lqfva2GSmjTdkc6XKhlbV5tZUsYoNz",
      ],
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`
          bg-blur-top
          ${geistSans.variable} ${geistMono.variable} antialiased
        `}
      >

        <ReduxProvider>
          <Toaster/>
          {/* USED TO FETCH USER */}
          <UserProvider />
          
          
          <Container className='w-full mt-5'>
            <Navbar />
          </Container>

          {children}

        </ReduxProvider>

        {/* <GoogleAnalytics gaId="G-NLZM6GH365" /> { /* hannahparacha */ }
        <GoogleAnalytics gaId="G-W64Y07B332" /> { /* seagull-app */ }
      </body>
    </html>
  );
}
