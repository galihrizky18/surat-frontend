"use client";
import React, { ReactNode, useEffect } from "react";
import { Collapse } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from "next/navigation";

type MenuBarProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  linkInside: string[];
};

const MenuCollapse: React.FC<MenuBarProps> = ({
  title,
  icon,
  children,
  linkInside,
}) => {
  const [opened, { toggle }] = useDisclosure(false);
  const path = usePathname();

  useEffect(() => {
    if (linkInside.includes(path)) {
      open();
    } else {
      close();
    }
  }, []);

  return (
    <>
      <button
        onClick={toggle}
        className={`flex flex-row gap-2 px-2 py-1 rounded-sm  hover:bg-gray-200  cursor-pointer ${
          opened ? "bg-gray-200 border border-gray-300" : ""
        } ${
          linkInside.includes(path) ? "bg-gray-200 border border-gray-300" : ""
        }`}
      >
        {icon} <span>{title}</span>
      </button>

      <Collapse in={opened} className="ml-5 flex flex-col gap-1">
        {children}
      </Collapse>
    </>
  );
};

export default MenuCollapse;
