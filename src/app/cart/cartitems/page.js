"use client";
import useAuthentication from "@/context/useAuthentication";
import userSavedData from "@/utils/UserSavedData";
import { useState, useEffect } from "react";
import { CART_COLLECTION_ID } from "@/utils/envVariables";
import React from "react";
const CartPage = () => {
  const [productsData, setProductsData] = useState(null);
  const { userData } = useAuthentication();

  async function getData() {
    const data = await userSavedData.existingDoc(
      CART_COLLECTION_ID,
      userData?.$id
    );
    if (data.length != 0) setProductsData(data);
    else setProductsData(null);
  }
  useEffect(() => {
    console.log(userData.$id);
    getData();
  }, []);

  console.log(productsData);
  return (
    <div className="mt-36 grid">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1>items in your cart</h1>
        {productsData &&
          productsData?.description.map((desc, index) => (
            <div
              className="bg-white p-4 my-4 w-max  shadow-md flex justify-center items-center"
              key={index}
            >
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
        {!productsData && (
          <div className="bg-blue-700 text-white p-4 col-span-2">
            Nothing in cart yet
          </div>
        )}
        <div className="col-span-2 mt-4 flex justify-end space-x-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
