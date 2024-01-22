import Link from "next/link";

function Desktop() {
  return (
    <div className="hidden lg:flex space-x-4">
      <Link href="#" className="text-white">
        Women
      </Link>{" "}
      <Link href="#" className="text-white">
        Men
      </Link>
      <Link href="#" className="text-white">
        Kids
      </Link>{" "}
      <Link href="#" className="text-white">
        Electronic
      </Link>
      <Link href="#" className="text-white">
        Home & Kitchen
      </Link>
      <Link href="#" className="text-white">
        Stationary
      </Link>
      <Link href="#" className="text-white">
        Pet
      </Link>
      <Link href="#" className="text-white">
        Books
      </Link>
      <Link href="#" className="text-white">
        Stationary
      </Link>
      <Link href="#" className="text-white">
        Skin Care
      </Link>
    </div>
  );
}

export default Desktop;
