"use client";
import CardComponents from "@/components/organisms/Admin/Dashboard/CardComponents";
import AdminTemplate from "@/components/template/AdminTemplate";
import React, { useEffect, useState } from "react";

import iconStetoskop from "@/assets/icons/card-stetskop.svg";
import iconSurat from "@/assets/icons/card-surat.svg";
import axios from "axios";
import Cookies from "js-cookie";
import useUserStore from "@/state/zustand/store/userStore";

const page = () => {
  const token = Cookies.get("token");

  const role = useUserStore((state) => state.role);

  const [dokterCount, setDokterCount] = useState<number>(0);
  const [salamCount, setSalamCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_HOST}/getCount`, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setDokterCount(res?.data?.data?.dokter);
            setSalamCount(res?.data?.data?.surat);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminTemplate title="Dashboard">
      <div className="flex flex-col gap-1 lg:gap-3 w-full h-full">
        {/* Card */}
        <div className="flex flex-row px-2 lg:px-5 py-2 gap-1 lg:gap-5 justify-center items-center w-full h-full ">
          <CardComponents
            image={iconStetoskop}
            number={dokterCount.toString()}
            title="Dokters"
            warna="#28a745"
            link="/admin/master/dokter"
          />
          <CardComponents
            image={iconSurat}
            number={salamCount.toString()}
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
          <p>Role saat ini: {role || "belum diset"}</p>
        </div>
      </div>
    </AdminTemplate>
  );
};

export default page;
