import { getImagesForProduct } from "@/utils/fetchImages";
import Image from "next/image";
import CartandWishlist from "./CartandWishlist";

const ProductList = async ({ query }) => {
  const images = await getImagesForProduct(query, 12);

  const dummyProducts = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    price: `$${(Math.random() * 50).toFixed(2)}`,
    rating: `${Math.random() * 5}`,
    image: images[index],
  }));

  return (
    <>
      {!images || images.length == 0 ? (
        <p className="text-white bg-black rounded-md text-center">no product found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-36 mx-4 mb-8">
      {dummyProducts.map((product) => (
        <div key={product.id} className="bg-neutral-200 p-8 rounded shadow">
          <Image
            width={500}
            height={500}
            src={product.image || "https://via.placeholder.com/500x500"}
            alt={product.title}
            className="w-full h-72 object-cover mb-2 rounded"
          />
          <h2 className="text-lg font-bold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-2 font-sans text-sm">
            {product.description}
          </p>
          <div className="flex items-center mb-2">
            <span className="text-green-500">{product.price}</span>
            <div className="ml-2 flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`h-4 w-4 fill-current ${
                    index < Math.floor(product.rating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 1l2.5 6h6.5l-5 4.5 2 6.5-5.5-4-5.5 4 2-6.5-5-4.5h6.5z" />
                </svg>
              ))}
            </div>
          </div>
          <CartandWishlist  product={product}/>
        </div>
      ))}
    </div>
      )}
    </>
  );
};

export default ProductList;
