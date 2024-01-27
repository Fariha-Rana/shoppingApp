"use client";
import { useContext } from "react";
import { cart_wishlist_count_Context } from "./cart-wishCountProvider";


const useCount = () => {
  return useContext(cart_wishlist_count_Context);
};
export default useCount;
