import Link from "next/link";

const categories = [
  { name: "Women", link: "/women-wear" },
  { name: "Men", link: "/men-wear" },
  { name: "Kids", link: "/kids-wear" },
  { name: "Electronic", link: "/electronic-gadgets" },
  { name: "Home & Kitchen", link: "/home&kitchen" },
  { name: "Stationary", link: "/stationary" },
  { name: "Pet", link: "/pet-food" },
  { name: "Books", link: "/book-cover" },
  { name: "Jewellrey", link: "/jewellery" },
  { name: "Skin Care", link: "/skin-care-products" },
  { name: "Make up", link: "/makeup-products" },
  { name: "Toys", link: "/toys" },
];

function Items() {
  return (
    <>
      {categories.map((category, index) => (
        <Link key={index} href={category.link} className="text-white font-sans">
          {category.name}
        </Link>
      ))}
    </>
  );
}

export default Items;
