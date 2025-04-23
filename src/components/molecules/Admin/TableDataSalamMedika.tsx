"use client";
import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import axios from "axios";
import Cookies from "js-cookie";

import { ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import {
  IconPrinter,
  IconTrash,
  IconFileDescription,
} from "@tabler/icons-react";
import Swal from "sweetalert2";
import useUserStore from "@/state/zustand/store/userStore";

const apiHost = process.env.NEXT_PUBLIC_API_HOST;

interface typeGetSurat {
  id: 17;
  no_surat: string;
  nama: string;
  diagnosa: string;
  mulai: string;
  sampai: string;
  id_dokter: string;
  dokters: {
    nama: string;
    nip: string;
  };
}

type typeSurat = {
  id: bigint;
  no_surat: string;
  nama_pasien: string;
  mulai: string;
  sampai: string;
  dokter: string;
};

const TableDataSalamMedika = () => {
  const token = Cookies.get("token");
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const userRole = useUserStore((state) => state.role);
  const [surat, setSurat] = useState<typeSurat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiHost}/surat-salam`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          const convertData = response.data.data.map((data: typeGetSurat) => ({
            id: data.id,
            no_surat: data.no_surat,
            nama_pasien: data.nama,
            mulai: new Date(data.mulai).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            sampai: new Date(data.sampai).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            dokter: data.dokters.nama,
          }));
          setSurat(convertData);
        } else {
          console.error("Data tidak ditemukan");
          Swal.fire({
            icon: "error",
            title: "Data Tidak Ditemukan",
            text: "Tidak ada data yang tersedia.",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        const errorMessage =
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : "Terjadi masalah saat mengambil data. Silakan coba lagi.";

        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: errorMessage,
        });
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = (id: bigint) => {
    Swal.fire({
      title: "Yakin Ingin Hapus?",
      showDenyButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: "Batalkan",
    }).then(async (result) => {
      if (result.isDenied) {
        return;
      }

      try {
        const response = await axios.delete(`${apiHost}/surat-salam/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          Swal.fire({
            title: "Berhasil!",
            text: "Surat Berhasil Dihapus",
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
    });
  };

  const handleCetak = async (id: bigint) => {
    try {
      Swal.fire({
        title: "Tunggu Sebentar...",
        text: "Sedang memproses surat, harap tunggu.",
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        `${apiHost}/surat-salam/cetak`,
        { id: `${id}` },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Menambahkan responseType untuk menangani file PDF
        }
      );

      if (response.status === 200) {
        const blob = response.data;
        const fileUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = "surat-salam-medika.pdf";
        link.click();

        Swal.fire({
          title: "Berhasil!",
          text: "Surat berhasil diunduh.",
          icon: "success",
          confirmButtonText: "Oke",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.close();

      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data);
        Swal.fire({
          title: "Gagal!",
          text:
            error.response.data.message ||
            "Terjadi kesalahan saat mengunduh surat.",
          icon: "error",
          confirmButtonText: "Oke",
        });
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  const rows = surat.map((data) => (
    <Table.Tr key={data.id}>
      <Table.Td className="truncate max-w-[40px] lg:max-w-[100%] overflow-hidden whitespace-nowrap">
        {data.no_surat}
      </Table.Td>
      <Table.Td className="truncate max-w-[110px] lg:max-w-[100%] overflow-hidden whitespace-nowrap">
        {data.nama_pasien}
      </Table.Td>
      <Table.Td className="truncate max-w-[90px] lg:max-w-[100%] overflow-hidden whitespace-nowrap">
        {data.sampai}
      </Table.Td>
      <Table.Td className="truncate max-w-[90px] lg:max-w-[100%] overflow-hidden whitespace-nowrap">
        {data.mulai}
      </Table.Td>
      <Table.Td className=" truncate max-w-[70px] lg:max-w-[100%] overflow-hidden whitespace-nowrap flex flex-col gap-1 ">
        <button
          className="flex items-center gap-1 bg-[#007bff] hover:bg-sky-500 text-white rounded px-2 py-1 lg:py-2 text-[.5rem] lg:text-base hover:cursor-pointer"
          onClick={() => {}}
        >
          <IconFileDescription size={isSmallScreen ? 13 : 18} />
          <span className="text-[.5rem] lg:text-base">Detail</span>
        </button>

        <button
          className="flex items-center gap-1 bg-[#28a745] hover:bg-green-500 text-white rounded px-2 py-1 g:py-2 text-[.5rem] lg:text-base hover:cursor-pointer"
          onClick={() => {
            handleCetak(data.id);
          }}
        >
          <IconPrinter size={isSmallScreen ? 13 : 18} />
          <span className="text-[.5rem] lg:text-base">Cetak Surat</span>
        </button>

        <button
          className={`flex items-center gap-1 bg-[#dc3545] hover:bg-red-500 text-white rounded px-2 py-1 g:py-2 text-[.5rem] lg:text-base hover:cursor-pointer ${
            userRole === "admin" ? "block" : "hidden"
          }`}
          onClick={() => {
            handleDelete(data.id);
          }}
        >
          <IconTrash size={isSmallScreen ? 13 : 18} />
          <span className="text-[.5rem] lg:text-base">Delete</span>
        </button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea w="100%" h="100%" className="">
      <Table stickyHeader>
        <Table.Thead className="text-[.6rem] lg:text-base">
          <Table.Tr>
            <Table.Th className="w-[20%] text-center">No Surat</Table.Th>
            <Table.Th className="w-[40%] text-center">Nama Pasien</Table.Th>
            <Table.Th className="w-[15%] text-center">Mulai</Table.Th>
            <Table.Th className="w-[15%] text-center">Sampai</Table.Th>
            <Table.Th className="">Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="text-[.6rem] lg:text-sm">{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default TableDataSalamMedika;
