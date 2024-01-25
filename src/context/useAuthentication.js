"use client";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const useAuthentication = () => {
  return useContext(AuthContext);
};
export default useAuthentication;
