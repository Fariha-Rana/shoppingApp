"use client";
import React, { useState, useEffect } from "react";
import {
  WISHLIST_COLLECTION_ID,
  CART_COLLECTION_ID,
} from "@/utils/envVariables";
import useAuthentication from "@/context/useAuthentication";
import userSavedData from "@/utils/UserSavedData";
import useCount from "@/context/useCount";

const WishlistPage = () => {
  const [productsData, setProductsData] = useState(null);
  const [addedStates, setAddedStates] = useState([]);
  const { userData } = useAuthentication();
  const { cartCount, wishlistCount, setWishlistCount, setCartCount } =
    useCount();

  const addToCart = async (product, index) => {
    const data = {
      price: product.price[index],
      image: product.image[index],
      price: product.price[index],
      inCart: true,
    };

    const updatedAddedStates = [...addedStates];
    updatedAddedStates[index] = true;
    setAddedStates(updatedAddedStates);

    const _cartCount = cartCount + 1;
    const count = {
      cart: _cartCount,
    };
    setCartCount(count.cart);
    await userSavedData.updateCartandWishlistCount(userData?.$id, count);
    await userSavedData.postCartorWishlistData(
      data,
      CART_COLLECTION_ID,
      userData?.$id
    );
  };

  async function getData() {
    const data = await userSavedData.existingDoc(
      WISHLIST_COLLECTION_ID,
      userData?.$id
    );
    console.log;
    console.log("data?.image?.length", data?.image?.length);
    if (data) {
      setProductsData(data);
      setAddedStates(new Array(data?.image?.length).fill(false));
    } else setProductsData(null);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="mt-32 flex flex-col justify-center  items-center gap-4 min-h-screen">
        {!productsData && (
          <div className="bg-blue-700 text-white p-4 text-center">
            Nothing in Wishlist yet
          </div>
        )}
        <div className="mt-8 grid min-[1100px]:grid-cols-3 sm:grid-cols-2 gap-4 ">
          {productsData &&
            productsData?.image?.map((desc, index) => (
              <div
                className="bg-white p-4 my-4 w-max shadow-md flex justify-center items-center flex-col max-[370px]:ml-4"
                key={index}
              >
                <Image
                width={500}
                height={500}
                src={productsData?.image[index]}
                alt="product image"
                className="lg:w-64 md:w-60 sm:w-56 w-48 h-40 object-cover mb-4"
              />
                <div className="flex flex-col w-80 p-4">
                  <h5 className="text-lg font-semibold mb-2">{`Product ${
                    index + 1
                  }`}</h5>
                  <p className="text-gray-600 mb-2">
                    <b>Description:</b> Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud
                  </p>
                  <p className="text-gray-600 mb-2">
                    <b>Price:</b> {productsData?.price[index]}
                  </p>
                  <div className="flex justify-end">
                    <span className="text-md mr-2 mt-2">
                      {addedStates[index] && "added"}
                    </span>
                    <button
                      className="bg-blue-800 px-4 py-2 text-white"
                      onClick={() => addToCart(productsData, index)}
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
