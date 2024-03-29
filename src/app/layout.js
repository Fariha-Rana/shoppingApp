import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

import AuthProvider from "@/context/AuthProvider";
import CountProvider from "@/context/cart-wishCountProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Shopping app",
  description: "purchase your favorite products online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <AuthProvider>
          <CountProvider>
            <Navbar />
            {children}
            <Footer />
          </CountProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
