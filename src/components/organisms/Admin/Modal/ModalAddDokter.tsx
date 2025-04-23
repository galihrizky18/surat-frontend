"use client";
import React, { useEffect, useState } from "react";
import { IconFolderPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input, InputBase } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { DateInput } from "@mantine/dates";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import useUserStore from "@/state/zustand/store/userStore";

import { useMediaQuery } from "@mantine/hooks";

const apiHost = process.env.NEXT_PUBLIC_API_HOST;

const ModalAddDokter = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const userRole = useUserStore((state) => state.role);
  const userid = useUserStore((state) => state.userId);

  const [opened, { open, close }] = useDisclosure(false);
  const [tglLahir, setTglLahir] = useState<Date | null>(null);

  const [nip, setNip] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [tempatLahir, setTempatLahir] = useState<string>("");
  const [noTelpon, setNoTelpon] = useState<string>("");
  const [status, setStatus] = useState<string>("active");

  const handleSubmit = async () => {
    const token = Cookies.get("token");
    try {
      const response: AxiosResponse = await axios.post(
        `${apiHost}/dokter`,
        {
          nip: nip,
          nama: nama,
          tempat_lahir: tempatLahir,
          tgl_lahir: tglLahir?.toISOString().split("T")[0],
          no_telpon: noTelpon.replace(/\D/g, ""),
          status: status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: "Dokter Berhasil Ditambah",
          icon: "success",
          confirmButtonText: "Oke",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        if (!error.response.data.success) {
          Swal.fire({
            title: "Gagal!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "Oke",
          });
        }
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <>
      <button
        className={`flex flex-row items-center gap-2 bg-[#28a745] text-white px-2 lg:px-4  py-1 lg:py-2 rounded-sm shadow-md hover:bg-green-500 transition duration-200 ease-in-out ${
          userRole === "admin" ? "block" : "hidden"
        }`}
        onClick={open}
      >
        <IconFolderPlus size={18} />
        <span className="text-[.6rem] lg:text-sm">Tambah Dokter</span>
      </button>

      <Modal
        opened={opened}
        onClose={close}
        title="Tambah Dokter"
        size={isSmallScreen ? "100%" : "50%"}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          {/* Form */}
          <div className="flex flex-col gap-3">
            {/* NIP */}
            <div className="flex flex-col text-[.8rem] lg:text-sm">
              <label htmlFor="">NIP</label>
              <Input
                placeholder="NIP"
                value={nip}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNip(e.target.value)
                }
                size={isSmallScreen ? "xs" : "sm"}
              />
            </div>

            {/* Nama */}
            <div className="flex flex-col text-[.8rem] lg:text-sm">
              <label htmlFor="">Nama Lengkap</label>
              <Input
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNama(e.target.value)
                }
                size={isSmallScreen ? "xs" : "sm"}
              />
            </div>

            {/* Tempat Lahir & Tanggal Lahir */}
            <div className="grid grid-cols-2 gap-2">
              <div className=" flex flex-col text-[.8rem] lg:text-sm">
                <label htmlFor="">Tempat Lahir</label>
                <Input
                  placeholder="Tempat Lahir"
                  value={tempatLahir}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTempatLahir(e.target.value)
                  }
                  size={isSmallScreen ? "xs" : "sm"}
                />
              </div>

              <div className="flex flex-col text-[.8rem] lg:text-sm">
                <label htmlFor="">Tanggal Lahir</label>
                <DateInput
                  value={tglLahir}
                  onChange={setTglLahir}
                  placeholder="Tanggal Lahir"
                  clearable
                  defaultValue={new Date()}
                  size={isSmallScreen ? "xs" : "sm"}
                />
              </div>
            </div>

            {/* No Telpon */}
            <div className="flex flex-col text-[.8rem] lg:text-sm">
              <label htmlFor="">No Telpon</label>
              <InputBase
                component={IMaskInput}
                mask="(0000) 0000-0000"
                placeholder="No Telpon"
                value={noTelpon}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNoTelpon(e.target.value)
                }
                size={isSmallScreen ? "xs" : "sm"}
              />
            </div>
          </div>

          {/* Button */}
          <div className="">
            <button
              className="flex flex-row items-center gap-2 bg-sky-600 text-white px-2 lg:px-4 py-1 lg:py-2 rounded-sm shadow-md hover:bg-sky-500 transition duration-200 ease-in-out "
              type="submit"
            >
              <span className="text-[.8rem] lg:text-sm">Simpan</span>
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalAddDokter;
