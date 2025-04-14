"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type MenuBarProps = {
  title: string;
  link: string;
  icon: ReactNode;
};

const MenuBar: React.FC<MenuBarProps> = ({ title, link, icon }) => {
  const path = usePathname();

  return (
    <Link
      href={link}
      className={`flex flex-row gap-2 px-2 py-1 rounded-sm  hover:bg-gray-200 ${
        link == path ? "bg-gray-200" : ""
      }`}
    >
      {icon} <span>{title}</span>
    </Link>
  );
};

export default MenuBar;
