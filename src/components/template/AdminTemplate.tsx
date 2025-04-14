import React, { ReactNode } from "react";
import Sidebar from "../organisms/Admin/Sidebar";
import UserAvatar from "../organisms/Admin/UserAvatar";

type AdminTemplateProps = {
  title: string;
  children: ReactNode;
};

const AdminTemplate: React.FC<AdminTemplateProps> = ({ title, children }) => {
  return (
    <div className="w-full h-screen flex flex-row bg-gray-100 ">
      <div className=" md:block">
        <Sidebar />
      </div>

      <div className="pl-2 w-full flex flex-col gap-3 font-poppins">
        {/* TOP Bar */}
        <div className="flex flex-row justify-between items-center bg-white w-full px-5 py-3 rounded-l-md shadow-md ">
          {/* Judul */}
          <h1 className="text-xl font-semibold">{title}</h1>

          {/* User */}
          <div className=" flex flex-row items-center gap-2 ">
            <span>Susi</span>
            <UserAvatar />
          </div>
        </div>

        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default AdminTemplate;
