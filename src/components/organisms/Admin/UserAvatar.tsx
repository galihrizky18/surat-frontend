"use client";
import React from "react";
import { Popover, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMediaQuery } from "@mantine/hooks";

const UserAvatar = () => {
  const router = useRouter();

  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => Cookies.remove(cookieName));
    router.push("/login");
  };
  return (
    <Popover
      // width={150}
      width={isSmallScreen ? 90 : 150}
      position="bottom"
      offset={{ mainAxis: 6, crossAxis: -29 }}
      shadow="md"
    >
      <Popover.Target>
        <button className="cursor-pointer">
          <Avatar
            src=""
            alt="user"
            radius="xl"
            size={isSmallScreen ? 30 : 35}
          />
        </button>
      </Popover.Target>
      <Popover.Dropdown className="flex flex-col gap-1 text-xs lg:text-lg ">
        <button className="text-left px-1 lg:px-2 py-1 cursor-pointer hover:font-bold hover:bg-gray-100 ">
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="text-left px-1 lg:px-2 py-1 cursor-pointer hover:font-bold hover:bg-gray-100"
        >
          Keluar
        </button>
      </Popover.Dropdown>
    </Popover>
  );
};

export default UserAvatar;
