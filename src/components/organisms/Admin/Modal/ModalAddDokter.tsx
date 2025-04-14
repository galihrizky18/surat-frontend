"use client";
import React, { useState } from "react";
import { IconFolderPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input, InputBase } from "@mantine/core";
import { IMaskInput } from "react-imask";
import { DateInput } from "@mantine/dates";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

const apiHost = process.env.NEXT_PUBLIC_API_HOST;

const ModalAddDokter = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [tglLahir, setTglLahir] = useState<Date | null>(null);

  const [nip, setNip] = useState<string>("");
  const [nama, setNama] = useState<string>("");
  const [tempatLahir, setTempatLahir] = useState<string>("");
  const [noTelpon, setNoTelpon] = useState<string>("");
  const [status, setStatus] = useState<string>("active");

  const handleSubmit = async () => {
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
      <Button
        onClick={open}
        leftSection={<IconFolderPlus size={18} />}
        variant="filled"
        color="#28a745"
        size="xs"
      >
        Tambah Dokter
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Tambah Dokter"
        size="50%"
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
            <div className="flex flex-col text-sm">
              <label htmlFor="">NIP</label>
              <Input
                placeholder="NIP"
                value={nip}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNip(e.target.value)
                }
              />
            </div>

            {/* Nama */}
            <div className="flex flex-col text-sm">
              <label htmlFor="">Nama Lengkap</label>
              <Input
                placeholder="Nama Lengkap"
                value={nama}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNama(e.target.value)
                }
              />
            </div>

            {/* Tempat Lahir & Tanggal Lahir */}
            <div className="grid grid-cols-2 gap-2">
              <div className=" flex flex-col text-sm">
                <label htmlFor="">Tempat Lahir</label>
                <Input
                  placeholder="Tempat Lahir"
                  value={tempatLahir}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTempatLahir(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col text-sm">
                <label htmlFor="">Tanggal Lahir</label>
                <DateInput
                  value={tglLahir}
                  onChange={setTglLahir}
                  placeholder="Tanggal Lahir"
                  clearable
                  defaultValue={new Date()}
                />
              </div>
            </div>

            {/* No Telpon */}
            <div className="flex flex-col text-sm">
              <label htmlFor="">No Telpon</label>
              <InputBase
                component={IMaskInput}
                mask="(0000) 0000-0000"
                placeholder="No Telpon"
                value={noTelpon}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNoTelpon(e.target.value)
                }
              />
            </div>
          </div>

          {/* Button */}
          <div className="">
            <Button variant="filled" size="sm" type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ModalAddDokter;
