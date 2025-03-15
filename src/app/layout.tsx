import "./styles/globals.css";
import "./styles/typography.css";
import TopLoadingBar from "./components/ui/Loading/TopLoadingBar";
import ReduxProvider from "./redux/ReduxProvider";
import GetUser from "./redux/GetUser";
import Nav from "./components/ui/Nav/Nav";

// Types
import type { Metadata } from "next";

// Fonts
import { Geist, Geist_Mono } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Seagull",
  description: "Welcome to Seagull",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <ReduxProvider>

          <TopLoadingBar />
          <Nav/>
          <GetUser/>
          {children}

        </ReduxProvider>

      </body>

    </html>
  );

}
