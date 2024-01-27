"use client";
import Image from "next/image";
import { useState } from "react";

import {
  WISHLIST_COLLECTION_ID,
  CART_COLLECTION_ID,
} from "@/utils/envVariables";

import userSavedData from "@/utils/UserSavedData";
import useAuthentication from "@/context/useAuthentication";
import useCount from "@/context/useCount";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CartandWishlist({ product }) {
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const { setWishlistCount, setCartCount, wishlistCount, cartCount } =
  useCount();

  const { userData } = useAuthentication();
  const userid = userData?.$id

  const postCartData = async () => {
    if (!userid) {
      toast.error('You should log in first');
      return;
    }

    const data = {
      ...product,
      inCart: true,
      inWishlist: false,
    };

    const _cartCount = cartCount + 1;
    const count = {
      cart: _cartCount,
    };

    setInCart(true);
    setCartCount(count.cart);

    await userSavedData.updateCartandWishlistCount(userid, count);
    await userSavedData.postCartorWishlistData(
      data,
      CART_COLLECTION_ID,
      userid
    );
  };

  const postWishlistData = async () => {
    if (!userid) {
      toast.error('You should log in first');
      return;
    }

    const data = {
      ...product,
      inWishlist: true,
      inCart: false,
    };

    const _wishlistCount = wishlistCount + 1;
    const count = {
      wishlist: _wishlistCount,
    };

    setWishlistCount(count.wishlist);
    setInWishlist(true);

    await userSavedData.updateCartandWishlistCount(
     userid,
      count
    );

    await userSavedData.postCartorWishlistData(
      data,
      WISHLIST_COLLECTION_ID,
      userid
    );
  };

  return (
    <>
      <div>{ <ToastContainer/> }</div>
    <div className="flex justify-between gap-4 items-center">
      {/* Cart button */}
      <button className="flex" onClick={postCartData}>
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
        <span className="">{inCart && "added"}</span>
      </button>

      {/* Wishlist button */}
      {!inWishlist ? (
        <button className="text-gray-500 " onClick={postWishlistData}>
          <Image
            width={28}
            height={28}
            src="https://img.icons8.com/material-outlined/24/like--v1.png"
            alt="like--v3"
            className="rounded-full w-6 h-auto"
          />
        </button>
      ) : (
        <button className="text-gray-500">
          <Image
            width={28}
            height={28}
            src="https://img.icons8.com/color/48/like--v3.png"
            alt="like--v3"
            className="rounded-full w-6 h-auto "
          />
        </button>
      )}
    </div>
     </>
  );
}

export default CartandWishlist;
