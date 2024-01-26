"use client";
import useAuthentication from "@/context/useAuthentication";
import userSavedData from "@/utils/UserSavedData";
import { useState, useEffect } from "react";
import { WISHLIST_COLLECTION_ID } from "@/utils/envVariables";
import React from "react";
const CartPage = () => {
  const [productsData, setProductsData] = useState(null);
  const { userData } = useAuthentication();

  async function getData() {
    const data = await userSavedData.existingDoc(
        WISHLIST_COLLECTION_ID,
      userData?.$id
    );
    if(data.length != 0 )setProductsData(data);
    else setProductsData(null)
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-36 grid lg:grid-col-4 md:grid-col-3 sm:grid-col-2">
      <div className="flex flex-col justify-center items-center gap-4">
            <h1>items in your Wishlist</h1>
        {productsData &&
          productsData?.description?.map((desc, index) => (
            <div className="bg-white p-4 my-4 w-max  shadow-md flex justify-center items-center" key={index}>
              <img
                src={productsData?.image[index]}
                alt={desc}
                className="w-40 h-auto object-cover mb-4"
              />
            <div className="flex flex-col w-80 p-4">
            <h5 className="text-lg font-semibold mb-2">
                {productsData?.title[index]}
              </h5>
              <p className="text-gray-600 mb-2">Description: {desc}</p>
              <p className="text-gray-600 mb-2">
                Price: {productsData?.price[index]}
              </p>
              <div className="flex space-x-4 items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                  Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
                  onClick={() => handleIncreaseQuantity(index)}
                >
                  Increase Quantity
                </button>
              </div>
            </div>
            </div>
          ))}
        {productsData == null && (
          <div className="bg-blue-700 text-white p-4 col-span-2">
            Nothing in cart yet
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
