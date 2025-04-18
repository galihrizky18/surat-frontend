"use client";
import React from "react";
import { Popover, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const UserAvatar = () => {
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => Cookies.remove(cookieName));
    router.push("/login");
  };
  return (
    <Popover
      width={150}
      position="bottom"
      offset={{ mainAxis: 6, crossAxis: -29 }}
      shadow="md"
    >
      <Popover.Target>
        <button className="cursor-pointer">
          <Avatar src="" alt="user" radius="xl" />
        </button>
      </Popover.Target>
      <Popover.Dropdown className="flex flex-col gap-1">
        <button className="text-left px-2 py-1 cursor-pointer hover:font-bold hover:bg-gray-100">
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="text-left px-2 py-1 cursor-pointer hover:font-bold hover:bg-gray-100"
        >
          Keluar
        </button>
      </Popover.Dropdown>
    </Popover>
  );
};

export default UserAvatar;
