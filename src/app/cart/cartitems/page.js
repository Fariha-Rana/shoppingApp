"use client";

import useAuthentication from "@/context/useAuthentication";
import userSavedData from "@/utils/UserSavedData";
import useCount from "@/context/useCount";

import { CART_COLLECTION_ID } from "@/utils/envVariables";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import CartSubmitButton from "./CartSubmitButton";

const CartPage = () => {
  const [productsData, setProductsData] = useState(null);
  const [quantity, setQuantities] = useState([]);

  const { userData } = useAuthentication();
  const userid = userData?.$id;

  const { setCartCount } = useCount();

  const handleIncreaseQuantity = async (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  const handleDecreaseQuantity = async (index) => {
    setQuantities((prevQuantities) => {
      if (prevQuantities[index] > 1) {
        const newQuantities = [...prevQuantities];
        newQuantities[index] -= 1;
        return newQuantities;
      }
      return prevQuantities;
    });
  };

  const removeItem = async (index) => {
    const data = {
      image: productsData.image[index],
      price: productsData.price[index],
      inWishlist: productsData.inWishlist[index],
      inCart: productsData.inCart[index],
    };

    const updatedCartCount = productsData.inCart.length - 1;

    const count = {
      cart: updatedCartCount,
    };

    try {
      await Promise.all([
        userSavedData.updateCartandWishlistCount(userid, count),
        userSavedData.removeCartorWishlistItem(
          CART_COLLECTION_ID,
          userid,
          data
        ),
      ]);
      await getData();
      setCartCount(count.cart);
    } catch (error) {
      console.log(error);
    }
  };

  async function getData() {
    const data = await userSavedData.existingDoc(
      CART_COLLECTION_ID,
      userData?.$id
    );

    if (data) {
      setProductsData(data);
      setQuantities(new Array(data?.image?.length).fill(1));
    } else setProductsData(null);
  }

  useEffect(() => {
    getData();
  }, [userid]);

  return (
    <div className="min-h-screen mt-36">
      <div className="bg-blue-700 text-white p-4 my-3 text-center">
        {productsData?.image?.length == 0 || !productsData
          ? "Nothing in Cart yet "
          : "Items in your cart"}
      </div>

      <div className="flex flex-col justify-center items-center gap-4 m-4 ">
        {productsData &&
          productsData?.image?.map((desc, index) => (
            <div
              className="bg-white shadow-md flex flex-col  min-[700px]:flex-row justify-center items-center p-4"
              key={index}
            >
              <div className="flex justify-center items-center w-[14rem] max-[650px]:w-max min-[700px]:mr-4 max-[650px]:mb-4">
                <img
                  src={productsData?.image[index]}
                  alt="product image"
                  className="w-auto h-[10rem] object-cover "
                />
              </div>

              <div className="flex flex-col">
                <h5 className="text-lg font-semibold mb-2">{`Product name`}</h5>

                <p className="text-gray-600 mb-2">
                  <b>Description:</b> Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                </p>

                <p className="text-gray-600 mb-2">
                  <b>Price:</b> {productsData?.price[index]}
                </p>

                <div className="flex space-x-8 items-center mb-4  ">
                  <span>
                    <b>quantity:</b> {quantity[index] || 0}
                  </span>

                  <button
                    className="text-white rounded-full hover:bg-gray-600 transition duration-300"
                    onClick={() => handleIncreaseQuantity(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 50 50"
                    >
                      <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                    </svg>
                  </button>

                  <button
                    className="rounded-full hover:bg-gray-600 transition duration-300"
                    onClick={() => handleDecreaseQuantity(index)}
                  >
                    <img
                      src="https://img.icons8.com/ios/50/minus.png"
                      alt="decrease"
                      className="w-5 h-auto"
                    />
                  </button>
                </div>
                <CartSubmitButton removeItem={removeItem} index={index} />
              </div>
            </div>
          ))}
      </div>

      {productsData?.image?.length > 0 && (
        <div className="col-span-2 my-4 flex justify-center space-x-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
