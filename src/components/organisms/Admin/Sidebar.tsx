import Image from "next/image";
import React from "react";
import {
  IconHome2,
  IconMailbox,
  IconFileAnalytics,
  IconMail,
  IconDatabase,
  IconStethoscope,
} from "@tabler/icons-react";

import SampleLogo from "@/assets/sample-logo.png";
import MenuBar from "@/components/molecules/Admin/MenuBar";
import MenuCollapse from "@/components/molecules/Admin/MenuCollapse";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 py-2 px-3 h-full bg-white border ">
      {/* Header */}
      <Link href="/admin">
        <div className="flex flex-row border-b-2 py-2 border-gray-100">
          <Image src={SampleLogo} alt="Logo" width={70} />

          <div className="flex justify-center items-center text-xl font-poppins ">
            GARIX KLINIK
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="mt-5 flex flex-col gap-2 ">
        <MenuBar title="Dashboard" link="/admin" icon={<IconHome2 />} />
        <MenuCollapse
          title="Master Data"
          icon={<IconDatabase />}
          linkInside={["dokter"]}
        >
          <MenuBar
            title="Dokter"
            link="/admin/master/dokter"
            icon={<IconStethoscope />}
          />
        </MenuCollapse>

        <MenuCollapse
          title="Surat"
          icon={<IconMailbox />}
          linkInside={["surat1", "surat2"]}
        >
          <MenuBar
            title="Salam Medika"
            link="/admin/salam-medika"
            icon={<IconMail />}
          />
          <MenuBar title="Surat Sakit 2" link="/surat2" icon={<IconMail />} />
        </MenuCollapse>
        <MenuBar
          title="Laporan"
          link="/admin/report"
          icon={<IconFileAnalytics />}
        />
      </div>
    </div>
  );
};

export default Sidebar;
