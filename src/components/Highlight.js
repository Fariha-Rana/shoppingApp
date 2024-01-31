"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const highlightBanners = [
  {
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Toys/GW/GW-Hero-PC_BBAug23_Soft-toys_with-Apay_Lifestyle_2x._CB597740150_.jpg",
  },
  {
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Beauty/GW/Jan/unrecatf/citi/Makeup-PCcv._CB584595621_.jpg",
  },
  {
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2024/Gateway/ATFGW/Winter_Blankets_GW_PC_3000x1200_UNREC._CB584967333_.jpg",
  },
];
function Highlight() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextSlide = (activeSlide + 1) % 3;
      setActiveSlide(nextSlide);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [activeSlide]);

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="relative"
      data-te-carousel-init
      data-te-ride="carousel"
    >

      <div className="relative w-full min-[800px]:h-96 overflow-hidden lg:top-32 md:top-[7.7rem] top-[6.9rem] -z-10">
        {highlightBanners.map((banner, index) => (
          <div
            key={index}
            className={`relative float-left ${
              index === activeSlide ? "-mr-[100%]" : "hidden"
            } w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
            data-te-carousel-active={index === activeSlide}
          >
            <Image
              src={banner?.image}
              width={1600}
              height={1900}
              className="block w-full h-auto"
              alt={`Slide ${index + 1}`}
              priority={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlight;
