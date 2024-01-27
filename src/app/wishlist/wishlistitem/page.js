"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  WISHLIST_COLLECTION_ID,
  CART_COLLECTION_ID,
} from "@/utils/envVariables";

import userSavedData from "@/utils/UserSavedData";
import useAuthentication from "@/context/useAuthentication";
import useCount from "@/context/useCount";

const WishlistPage = () => {
  const [productsData, setProductsData] = useState(null);
  const [addedStates, setAddedStates] = useState([]);

  const { cartCount, wishlistCount, setWishlistCount, setCartCount } =
  useCount();
  const { userData } = useAuthentication();

  const userid = userData?.$id

  const addToCart = async (product, index) => {
    const data = {
      price: product.price[index],
      image: product.image[index],
      inCart: true,
      inWishlist: false,
    };

    const updatedAddedStates = [...addedStates];
    updatedAddedStates[index] = true;
    setAddedStates(updatedAddedStates);

    const _cartCount = cartCount + 1;
    const count = {
      cart: _cartCount,
    };
    setCartCount(count.cart);

    await userSavedData.updateCartandWishlistCount(userid, count);
    await userSavedData.postCartorWishlistData(
      data,
      CART_COLLECTION_ID,
      userid
    );
  };



   const removeItem = async (index) => {
    const data = {
      image: productsData.image[index],
      price: productsData.price[index],
      inWishlist: productsData.inWishlist[index],
      inCart: productsData.inCart[index],
    };

    const updatedProductsData = { ...productsData };
    updatedProductsData.image.splice(index, 1);
    updatedProductsData.price.splice(index, 1);
    updatedProductsData.inWishlist.splice(index, 1);
    updatedProductsData.inCart.splice(index, 1);

    const updatedQuantities = [...addedStates];
    updatedQuantities.splice(index, 1);

    const updatedCount = wishlistCount - 1;
    const count = {
        wishlist : updatedCount
    }

    
    setWishlistCount(count.wishlist)
    setProductsData(updatedProductsData);
    setAddedStates(updatedQuantities);
    
    await userSavedData.updateCartandWishlistCount(userid, count)
     userSavedData.removeCartorWishlistItem(
      WISHLIST_COLLECTION_ID,
      userid,
      data
    );
  };


  async function getData() {

    const data = await userSavedData.existingDoc(
      WISHLIST_COLLECTION_ID,
      userid
    );

    if (data) {
      setProductsData(data);
      setAddedStates(new Array(data?.image?.length).fill(false));
    } else setProductsData(null);
  }

  useEffect(() => {
    getData();
  }, [userid]);

  return (
    <>
      <div className="min-h-screen mt-36">

      {(productsData?.image?.length == 0 || !productsData) && (
          <div className="bg-blue-700 text-white p-4 text-center">
            Nothing in Wishlist yet
          </div>
        )}
    
        <div className=" flex flex-col items-center justify-center">

          {productsData &&
            productsData?.image?.map((desc, index) => (
              <div
                className="bg-white p-4 my-4 w-max shadow-md flex flex-col sm:flex-row justify-center items-center sm:max-w-none"
                key={index}
              >
                <Image
                width={500}
                height={500}
                src={productsData?.image[index]}
                alt="product image"
                className="lg:w-64 md:w-60 sm:w-56 w-48 h-40 object-cover mb-4"
                priority={true}
              />

                <div className="flex flex-col w-80 p-4">
                  <h5 className="text-lg font-semibold mb-2">{`Product ${index + 1}`}</h5>

                  <p className="text-gray-600 mb-2">
                    <b>Description:</b> Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud
                  </p>

                  <p className="text-gray-600 mb-2">
                    <b>Price:</b> {productsData?.price[index]}
                  </p>

                  <div className="flex justify-end gap-4">
                    <span className="text-md mr-2 mt-2">
                      {addedStates[index] && "added"}
                    </span>
                    <button
                      className="bg-blue-800 px-4 py-2 text-white"
                      onClick={() => addToCart(productsData, index)}
                    >
                      add to cart
                    </button>

                    <button className="" onClick={() => removeItem(index)}>
                    <Image
                      width={20}
                      height={20}
                      src="https://img.icons8.com/ios-filled/50/waste.png"
                      alt="delete this item"
                      className="w-5 h-auto"
                    />
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
