"use client";
import { createContext, useState, useEffect } from "react";
import useAuthentication from "./useAuthentication";
import userSavedData from "@/utils/UserSavedData";

export const cart_wishlist_count_Context = createContext();

export default function CountProvider({ children }) {

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const { userData } = useAuthentication();
  const userId = userData?.$id;

  async function checkCount() {
    try {
      const isData = await userSavedData.cartandWishlistCount(userId);
      setCartCount(isData?.cart || 0);
      setWishlistCount(isData?.wishlist || 0);
    } catch (err) {
    }
  }

  useEffect(() => {
    if (userData) {
      checkCount();
    }
  }, [userId]);
  
  return (
    <cart_wishlist_count_Context.Provider
      value={{ wishlistCount, setWishlistCount, cartCount, setCartCount }}
    >
      {children}
    </cart_wishlist_count_Context.Provider>
  );
}
