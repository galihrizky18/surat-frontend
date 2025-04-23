"use client";
import React from "react";
import { Popover, Avatar } from "@mantine/core";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMediaQuery } from "@mantine/hooks";
import useUserStore from "@/state/zustand/store/userStore";

const UserAvatar = () => {
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
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
      <Popover.Dropdown className="flex flex-col gap-1 px-1 lg:px-2 py-1 text-xs lg:text-lg gap-2  ">
        <div className=" text-black font-bold pb-2 border-b-2">
          {userId === "" ? "Users" : userId}
        </div>

        <button className="text-left   cursor-pointer hover:font-bold hover:bg-gray-100 ">
          Profile
        </button>
        <button
          onClick={handleLogout}
          className="text-left  ursor-pointer hover:font-bold hover:bg-gray-100"
        >
          Keluar
        </button>
      </Popover.Dropdown>
    </Popover>
  );
};

export default UserAvatar;
