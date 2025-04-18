"use client";
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

import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button } from "@mantine/core";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "@mantine/hooks";

const SidebarAndoid = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  return (
    <>
      <Drawer opened={opened} onClose={close} size={"70%"}>
        <div className="w-full h-full bg-white ">
          {/* Header */}
          <Link href="/admin">
            <div className="flex flex-row border-b-2 py-2 border-gray-100">
              <Image
                src={SampleLogo}
                alt="Logo"
                width={isSmallScreen ? 60 : 70}
              />

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
              <MenuBar
                title="Surat Sakit 2"
                link="/surat2"
                icon={<IconMail />}
              />
            </MenuCollapse>
            <MenuBar
              title="Laporan"
              link="/admin/report"
              icon={<IconFileAnalytics />}
            />
          </div>
        </div>
      </Drawer>

      <div className="w-8 py-2  bg-white h-screen ">
        <div className="w-full h-full ">
          {/* Header */}

          <Link
            href={"/admin"}
            className="flex flex-row border-b-2 border-gray-100"
          >
            <Image src={SampleLogo} alt="Logo" width={70} />
          </Link>

          {/* Body */}
          <div onClick={open} className="mt-2 flex flex-col gap-2 ">
            <div
              className={`flex flex-row items-center px-2 py-1 rounded-sm justify-center`}
            >
              <IconHome2 size={20} />
            </div>

            <div
              className={`flex flex-row items-center px-2 py-1 rounded-sm justify-center`}
            >
              <IconStethoscope size={20} />
            </div>
            <div
              className={`flex flex-row items-center px-2 py-1 rounded-sm justify-center`}
            >
              <IconMailbox size={20} />
            </div>
            <div
              className={`flex flex-row items-center px-2 py-1 rounded-sm justify-center`}
            >
              <IconFileAnalytics size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAndoid;
