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

import WishlistSubmitButton from "./WishlistSubmitButton";

const WishlistPage = () => {
  const [productsData, setProductsData] = useState(null);
  const [addedStates, setAddedStates] = useState([]);

  const { cartCount, wishlistCount, setWishlistCount, setCartCount } =
    useCount();
  const { userData } = useAuthentication();

  const userid = userData?.$id;

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

    const updatedCount = productsData.inWishlist.length - 1;

    const count = {
      wishlist: updatedCount,
    };

    try {
      await Promise.all([
        userSavedData.updateCartandWishlistCount(userid, count),
        userSavedData.removeCartorWishlistItem(
          WISHLIST_COLLECTION_ID,
          userid,
          data
        ),
      ]);
      await getData();
      setWishlistCount(count.wishlist);
    } catch (error) {
      console.log(error);
    }
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
        <div className="bg-blue-700 text-white p-4 my-3 text-center">
          {productsData?.image?.length == 0 || !productsData
            ? "Nothing in Wishlist yet "
            : "Items in your Wishlist"}
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 m-4 ">
          {productsData &&
            productsData?.image?.map((desc, index) => (
              <div
                className="bg-white shadow-md flex flex-col justify-center items-center p-4"
                key={index}
              >
                <div className="flex justify-center items-center w-[14rem] max-[650px]:w-max mb-4">
                  <img
                    src={productsData?.image[index]}
                    alt="product image"
                    className="w-auto h-[10rem] object-cover "
                  />
                </div>

                <div className="flex flex-col ">
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

                    <WishlistSubmitButton
                      removeItem={removeItem}
                      index={index}
                    />
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
