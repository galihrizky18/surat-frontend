"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import Gambar1 from "@/assets/images/gambar1.jpg";
import Gambar2 from "@/assets/images/gambar2.jpg";
import Gambar3 from "@/assets/images/gambar3.jpg";

const CaraoselLogin = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 3000 }),
  ]);
  return (
    <div className="embla w-full h-full" ref={emblaRef}>
      <div className="embla__container w-full h-full">
        <div className="embla__slide relative w-full h-full">
          <Image src={Gambar1} alt="gambar" fill className="object-cover" />
        </div>
        <div className="embla__slide relative w-full h-full ">
          <Image src={Gambar2} alt="gambar" fill className="object-cover" />
        </div>
        <div className="embla__slide relative w-full h-full">
          <Image src={Gambar3} alt="gambar" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
};

export default CaraoselLogin;
