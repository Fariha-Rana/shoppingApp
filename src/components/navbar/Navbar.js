"use client";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";

// custom components
import ModalIcon from "./ModalIcon";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Search from "./NavItems/Search";
import Location from "./NavItems/Location";
import Cart from "./NavItems/Cart";
import Auth from "./NavItems/Auth";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <nav className="fixed top-0 font-bold m-0 p-0 w-full z-50">
      {/* for larger screen size */}
      <ul className="hidden min-[900px]:flex justify-between items-center px-8 py-2 bg-gray-600 ">
        <div className="flex items-center min-[800px]:gap-12">
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
        <div className="flex items-center gap-12">
          <Auth />
          <Cart />
        </div>
      </ul>

      {/* for smaller screen size */}
      <section className="">
        <aside className="min-[899px]:hidden flex flex-grow w-full bg-gray-800 py-2  pr-4 h-14">
          <Search />
          <Cart />
        </aside>

        <aside className="min-[899px]:hidden flex items-center justify-between bg-gray-600 px-2 py-2">
          <Link href="/" className="max-[560px]:w-10">
            <Image
              width={16}
              height={16}
              alt="logo"
              src="/next.svg"
              className="w-16 h-auto"
            />
          </Link>
          <Location />
          <Auth />
          <ModalIcon
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </aside>
      </section>

      {/* categories for shopping */}
      <DesktopMenu />
      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} />
    </nav>
  );
};

export default Navbar;
