
import Items from "./utils/Items";

function MobileMenu({isMobileMenuOpen}) {
  return (
    <>
      {" "}
      {isMobileMenuOpen && (
        <div className="lg:hidden flex flex-col bg-gray-600 border-t border-t-black py-2 pl-2">
          <Items />
        </div>
      )}
    </>
  );
}

export default MobileMenu;
