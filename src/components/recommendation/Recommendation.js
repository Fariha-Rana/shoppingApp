import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RecomCategories } from "./RecomCategories";

export default function Recommendation() {
  return (
    <div className="grid min-[350px]:grid-cols-2 min-[1200px]:grid-cols-4 min-[800px]:grid-cols-3 w-full h-full gap-4 max-[600px]:mt-16 z-40  mt-8 px-4 font-mono mb-8">
      {RecomCategories.map((categ, index) => (
        <div
          key={index}
          className="bg-neutral-100 h-auto max-w-full rounded-sm flex flex-col justify-center items-center py-1"
        >
          <h1 className="pt-2 text-lg font-bold max-[550px]:text-[0.8rem]">
           {categ?.title}
          </h1>
          <div className="flex justify-center">
            <Image
              width={400}
              height={400}
              className="min-[900px]:h-[22rem] max-[600px]:h-[10rem]  w-auto h-auto rounded-sm py-2"
              src={categ?.image}
              alt="pic"
            />
          </div>
          <Link
            href={`${categ?.url}`}
            className="text-blue-500 hover:underline"
          >
            See more
          </Link>
        </div>
      ))}
    </div>
  );
}
