"use client";

import Link from "next/link";
import Image from "next/image";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import Search from "@/components/navbar/Search";
import Location from "./Location";
import Cart from "./Cart";
import Auth from "./Auth";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-gray-700">
        <ul className="flex justify-between items-center px-8">
          <div className="flex items-center gap-12">
            <Link href="/" className="">
              <Image
                width={16}
                height={16}
                alt="logo"
                src="/next.svg"
                className="w-20 h-auto"
              />
            </Link>
            <Location />
          </div>
          <Search />
          <div className="flex items-center justify-center gap-12">
            <Cart />
            <Auth />
          </div>
        </ul>

        <div className="container mx-auto flex items-center justify-between">
          <div className="block lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          <Desktop />
        </div>

        <Mobile isMobileMenuOpen={isMobileMenuOpen} />
      </nav>
    </>
  );
};

export default Navbar;
