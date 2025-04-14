import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type CardComponentsProps = {
  image: StaticImageData;
  number: string;
  title: string;
  warna: string;
  link?: string;
};

const CardComponents: React.FC<CardComponentsProps> = ({
  image,
  number,
  title,
  warna,
  link = "#",
}) => {
  return (
    <Link
      href={link}
      className="text-white flex flex-row px-3 py-2 gap-2 rounded-lg  h-full shadow-lg w-full"
      style={{ backgroundColor: warna }}
    >
      <Image src={image} alt="icon" width={50} />
      <div className="flex flex-col justify-center gap-1 items-center w-full">
        <span className="font-bold text-2xl ">{number}</span>
        <h1 className=" text-center">{title}</h1>
      </div>
    </Link>
  );
};

export default CardComponents;
