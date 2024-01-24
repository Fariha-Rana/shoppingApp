"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";

function Highlight() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextSlide = (activeSlide + 1) % 3;
      setActiveSlide(nextSlide);
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, [activeSlide]);

  return (
    <div
      id="carouselExampleSlidesOnly"
      className="relative"
      data-te-carousel-init
      data-te-ride="carousel"
    >
      <div className="relative w-full min-[800px]:h-96 overflow-hidden after:clear-both after:block after:content-['']">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`relative float-left ${
              index === activeSlide ? "-mr-[100%]" : "hidden"
            } w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
            data-te-carousel-item
            data-te-carousel-active={index === activeSlide}
          >
            <Image
              src={`https://mdbcdn.b-cdn.net/img/new/slides/04${index + 1}.webp`}
              width={500}
              height={500}
              className="block w-full h-auto"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlight;
