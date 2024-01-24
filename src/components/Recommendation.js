import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Recommendation() {
  return (
    <div className="grid min-[350px]:grid-cols-2 min-[1200px]:grid-cols-4 min-[800px]:grid-cols-3   w-full h-full gap-4 mt-6 px-4">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
        <div
          key={index}
          className="bg-neutral-100 h-auto max-w-full rounded-sm flex flex-col justify-center items-start py-2"
        >
          <h1 className="pl-4 pt-2 text-lg font-bold max-[550px]:text-[0.8rem]">Smart gadgets</h1>
          <div className="flex justify-center">
          <Image
            width={400}
            height={400}
            className="min-[900px]:h-[22rem] max-[600px]:h-[10rem]  w-auto h-auto rounded-sm p-4"
            src={`https://mdbcdn.b-cdn.net/img/new/slides/04${index + 1}.webp`}
            alt=""
          />
          </div>
          <Link href="/products" className="text-blue-500 pl-4 pb-1 hover:underline">
            See more
          </Link>
        </div>
      ))}
    </div>
  );
}
