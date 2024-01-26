"use client";
import React from "react";
import Link from "next/link";
import userSavedData from "@/utils/UserSavedData";
import useAuthentication from "@/context/useAuthentication";
import { useEffect, useState } from "react";


function Cart() {
  const [itemCount, setItemCount] = useState(null);
  const { userData } = useAuthentication();

  useEffect(() => {
    if (userData) {
      async function getData() {
        const _itemCount = await userSavedData.cartandWishlistCount(
          userData?.$id
        );
        if (itemCount?.documents?.length != 0) setItemCount(_itemCount);
      }
      getData();
    }
  }, [userData]);

  return (
    <div className="flex justify-center items-center">
      <div className="relative py-2 mr-12">
        <Link href={"/wishlist/wishlistitem"} className="cursor-pointer">
          <div className="t-0 absolute left-5">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
              {itemCount?.wishlist || 0}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="28"
            height="28"
            className="mt-2 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C14.09 3.81 15.76 3 17.5 3 20.58 3 23 5.42 23 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </Link>
      </div>
      <div className="relative py-2 mr-4">
        <Link href={"/cart/cartitems"} className="cursor-pointer">
          <div className="top-[0.8rem] absolute left-4">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
              {itemCount?.cart || 0}
            </p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mt-4 h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
