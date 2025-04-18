"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "@mantine/hooks";

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
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  return (
    <Link
      href={link}
      className="text-white flex flex-row px-2 lg:px-3 py-1 lg:py-2 gap-1 lg:gap-2 rounded-lg  h-full shadow-lg w-full"
      style={{ backgroundColor: warna }}
    >
      <Image src={image} alt="icon" width={isSmallScreen ? 20 : 50} />
      <div className="flex flex-col justify-center gap-1 items-center w-full">
        <span className="font-bold text-lg lg:text-2xl ">{number}</span>
        <h1 className=" text-[0.5rem] lg:text-xl text-center">{title}</h1>
      </div>
    </Link>
  );
};

export default CardComponents;
