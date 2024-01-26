"use client";
import Image from "next/image";
import userSavedData from "@/utils/UserSavedData";
import {
  WISHLIST_COLLECTION_ID,
  CART_COLLECTION_ID,
} from "@/utils/envVariables";
import useAuthentication from "@/context/useAuthentication";

function CartandWishlist({ product }) {
  const { userData } = useAuthentication();

  const postCartData = async () => {
    const data = {
      ...product,
      inCart: true,
    };
    await userSavedData.postCartorWishlistData(
      data,
      CART_COLLECTION_ID,
      userData?.$id
    );
  };
  const postWishlistData = async () => {
    const data = {
      ...product,
      inWishlist: [true],
    };
    await userSavedData.postCartorWishlistData(
      data,
      WISHLIST_COLLECTION_ID,
      userData?.$id
    );
  };

  return (
    <div className="flex justify-start gap-4 items-center">
      {/* Cart button */}
      <button onClick={postCartData}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="black"
          className="file: h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </button>

      {/* Wishlist button */}
      <button className="text-gray-500 " onClick={postWishlistData}>
        <Image
          width={28}
          height={28}
          src="https://img.icons8.com/material-outlined/24/like--v1.png"
          alt="like--v3"
          className="rounded-full w-5 h-auto"
        />
      </button>
      <button className="text-gray-500">
        <Image
          width={28}
          height={28}
          src="https://img.icons8.com/color/48/like--v3.png"
          alt="like--v3"
          className="rounded-full w-6 h-auto "
        />
      </button>
    </div>
  );
}

export default CartandWishlist;
