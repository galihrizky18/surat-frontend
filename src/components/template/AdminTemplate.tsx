"use client";
import React, { ReactNode } from "react";
import Sidebar from "../organisms/Admin/Sidebar";
import UserAvatar from "../organisms/Admin/UserAvatar";
import SidebarAndoid from "../organisms/Admin/SidebarAndoid";
import useUserStore from "@/state/zustand/store/userStore";

type AdminTemplateProps = {
  title: string;
  children: ReactNode;
};

const AdminTemplate: React.FC<AdminTemplateProps> = ({ title, children }) => {
  const userId = useUserStore((state) => state.userId);
  return (
    <div className="w-full h-screen flex flex-row bg-gray-100 ">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="block lg:hidden">
        <SidebarAndoid />
      </div>

      <div className="pl-1.5 lg:pl-2 pt-2 w-full flex flex-col gap-2 lg:gap-3 font-poppins ">
        {/* TOP Bar */}
        <div className="flex flex-row justify-between items-center bg-white w-full px-3 lg:px-5 py-1 lg:py-3 rounded-l-md shadow-md ">
          {/* Judul */}
          <h1 className=" text-sm lg:text-xl font-semibold">{title}</h1>

          {/* User */}
          <div className=" flex flex-row items-center gap-2 ">
            <span className="lg:block hidden">
              {userId === "" ? "Users" : userId}
            </span>
            <UserAvatar />
          </div>
        </div>

        <div className="text-xs ">{children}</div>
      </div>
    </div>
  );
};

export default AdminTemplate;
