"use client"
import { createContext, useState, useEffect} from "react";
import userAuth from "@/utils/authentication";
export const AuthContext = createContext()

export default function AuthProvider({children}) {
  const [userData, setUserData] = useState(false);
   useEffect(() => {
    async function checkLogInStatus(){
      try{
       const isData = await userAuth.getCurrentUser();
       if(isData) setUserData(isData)
      }catch(err){
         console.log("error in provider");
      }
     }
     checkLogInStatus();
   }, [])
   
  return (
    <AuthContext.Provider value={{ userData, setUserData}}>
    {children}
    </AuthContext.Provider>
  );
}