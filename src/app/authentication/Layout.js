"use client";
import useAuthentication from "@/context/useAuthentication";
import { useRouter } from "next/navigation";

function loginlayout({ children }) {
  const router = useRouter();
  const { userData } = useAuthentication();
  const userid = userData?.id
  if (userid){
    router.replace("/");
    return <></>;
  }

  return <>{children}</>;
}

export default loginlayout;
