"use client";
import useAuthentication from "@/context/useAuthentication";
import { useRouter } from "next/navigation";

function loginlayout({ children }) {
  const router = useRouter();
  const { userData } = useAuthentication();
  if (userData){
    router.replace("/");
    return <></>;
  }

  return <>{children}</>;
}

export default loginlayout;
