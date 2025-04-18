import CardComponents from "@/components/organisms/Admin/Dashboard/CardComponents";
import AdminTemplate from "@/components/template/AdminTemplate";
import React from "react";

import iconStetoskop from "@/assets/icons/card-stetskop.svg";
import iconSurat from "@/assets/icons/card-surat.svg";

const page = () => {
  return (
    <AdminTemplate title="Dashboard">
      <div className="flex flex-col gap-1 lg:gap-3 w-full h-full">
        {/* Card */}
        <div className="flex flex-row px-2 lg:px-5 py-2 gap-1 lg:gap-5 justify-center items-center w-full h-full ">
          <CardComponents
            image={iconStetoskop}
            number="2"
            title="Dokters"
            warna="#28a745"
            link="/admin/master/dokter"
          />
          <CardComponents
            image={iconSurat}
            number="13"
            title="Surat Salam Medika"
            warna="#007bff"
            link="/admin/salam-medika"
          />
          <CardComponents
            image={iconSurat}
            number="8"
            title="Surat Sakit 2"
            warna="#007bff"
          />
        </div>

        <div className="bg-white rounded-md shadow-lg px-3 py-2 text-xs lg:text-lg ">
          Main
        </div>
      </div>
    </AdminTemplate>
  );
};

export default page;
