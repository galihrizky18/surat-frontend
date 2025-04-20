"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { useMediaQuery } from "@mantine/hooks";

type MenuBarProps = {
  title: string;
  link: string;
  icon: ReactNode;
};

const MenuBar: React.FC<MenuBarProps> = ({ title, link, icon }) => {
  const path = usePathname();
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <Link
      href={link}
      className={`flex flex-row items-center gap-2 px-2 py-1 rounded-sm  hover:bg-gray-200 ${
        link == path ? "bg-gray-200" : ""
      }`}
    >
      {icon}{" "}
      <span className={`${isSmallScreen ? "text-sm" : "text-base"}`}>
        {title}
      </span>
    </Link>
  );
};

export default MenuBar;
