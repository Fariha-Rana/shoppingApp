import Link from "next/link";
function Mobile({isMobileMenuOpen}) {
  return (
    <>
    {" "}
    {isMobileMenuOpen && (
      <div className="lg:hidden mt-2">
        <Link href="#" className="block py-2 px-4 text-white">
          Products
        </Link>
        <Link href="#" className="block py-2 px-4 text-white">
          Categories
        </Link>
      </div>
    )}
  </>
  );
}

export default Mobile;
