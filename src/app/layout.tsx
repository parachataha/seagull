import "../styles/globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import ReduxProvider from './redux/ReduxProvider';
import Navbar from '@/components/layout/Navbar';
import { Metadata } from 'next';
import UserProvider from '@/components/providers/UserProvider';
import Container from '@/components/layout/Container';

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

export const metadata: Metadata = {
  applicationName: 'Seagull',
  title: "Seagull - Your Number One Blog Creator",
  description: "Unleash your creativity with our very own blog editor.",
  themeColor: "#C37F57",
  openGraph: {
      title: "Your Number One Blog Creator",
      description: "Unleash your creativity with our very own blog editor.",
      type: "article",
      images: [
        "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MW2ucz8CDXwvPbRW5gAI4D8i7o0Uct9HMTplya",
      ],
  },
  twitter: {
      card: "summary_large_image",
      title: "Your Number One Blog Creator",
      description: "Unleash your creativity with our very own blog editor.",
      images: [
        "https://z90iq4irr8.ufs.sh/f/b0Ply9TOA2MW2ucz8CDXwvPbRW5gAI4D8i7o0Uct9HMTplya",
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
          ${geistSans.variable} ${geistMono.variable} antialiased
        `}
      >

        <ReduxProvider>

          {/* USED TO FETCH USER */}
          <UserProvider />

          <Container className='w-full mt-5'>
            <Navbar />
          </Container>
          {children}

        </ReduxProvider>

      </body>
    </html>
  );
}
