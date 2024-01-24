import React from "react";
import Navbar from "@/components/navbar/Navbar";
import Highlight from "@/components/Highlight";
import Recommendation from "@/components/Recommendation";
function Home() {
  return (
    <>
      <Navbar />
      <Highlight/>
      <Recommendation/>
    </>
  );
}

export default Home;
