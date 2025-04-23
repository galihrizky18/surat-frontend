"use client";
import React, { useEffect, useState } from "react";
import { Table } from "@mantine/core";
import axios from "axios";
import { IconPencilCode, IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";
import { ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Cookies from "js-cookie";
import useUserStore from "@/state/zustand/store/userStore";
const apiHost = process.env.NEXT_PUBLIC_API_HOST;

interface Dokter {
  id: string;
  nip: string;
  nama: string;
  no_telpon: string;
  status: string;
  tempat_lahir: string;
  tgl_lahir: Date;
}

const TableDokters = () => {
  const token = Cookies.get("token");
  const userRole = useUserStore((state) => state.role);

  const [dokters, setDokters] = useState<Dokter[]>([]);

  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Yakin Ingin Hapus?",
      showDenyButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: "Batalkan",
      customClass: {
        popup: "max-w-xs p-1 rounded-lg shadow-md", // popup kecil & responsif
        title: "text-lg font-semibold text-red-600", // judul lebih kecil
        htmlContainer: "text-sm text-gray-700", // isi teks lebih kecil
        confirmButton:
          "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm",
      },
    }).then(async (result) => {
      if (result.isDenied) {
        return;
      }

      try {
        const response = await axios.delete(`${apiHost}/dokter/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            uthorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          Swal.fire({
            title: "Berhasil!",
            text: "Data Dokter Dihapus",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiHost}/dokter`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.data)) {
          const dokterList = response.data.data.map((data: Dokter) => ({
            id: data.id,
            nip: data.nip,
            nama: data.nama,
            status: data.status,
          }));

          setDokters(dokterList);
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

  const rows = dokters.map((element) => (
    <Table.Tr key={element.id} className="">
      <Table.Td className="truncate max-w-[110px] overflow-hidden whitespace-nowrap">
        {element.nip}
      </Table.Td>
      <Table.Td className="truncate max-w-[110px] overflow-hidden whitespace-nowrap">
        {element.nama}
      </Table.Td>
      <Table.Td className="truncate max-w-[110px] overflow-hidden whitespace-nowrap">
        {element.status}
      </Table.Td>
      <Table.Td className={`flex flex-row gap-2 `}>
        <button
          className={`flex items-center gap-1 bg-[#007bff] text-white rounded px-2 py-1 text-[.5rem] lg:text-base ${
            userRole === "admin" ? "block" : "hidden"
          }`}
          onClick={() => {}}
        >
          <IconPencilCode size={isSmallScreen ? 13 : 18} />
          <span className="text-[.7rem] lg:text-base">Edit</span>
        </button>

        <button
          className={`flex items-center gap-1 bg-[#dc3545] text-white rounded px-2 py-1 text-[.5rem] lg:text-base ${
            userRole === "admin" ? "block" : "hidden"
          }`}
          onClick={() => {
            handleDelete(element.id);
          }}
        >
          <IconTrash size={isSmallScreen ? 15 : 18} />
          <span className="text-[.7rem] lg:text-base">Delete</span>
        </button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea w="100%" h="100%" className="">
      <Table stickyHeader width={"80%"} striped>
        <Table.Thead className="text-[.7rem] lg:text-base">
          <Table.Tr>
            <Table.Th className="w-[35%] lg:w-[25%] ">NIP</Table.Th>
            <Table.Th className="w-[40%] lg:w-[50%] ">Nama</Table.Th>
            <Table.Th className="w-[10%] ">Status</Table.Th>
            <Table.Th
              className={`w-[15%] ${userRole === "admin" ? "block" : "hidden"}`}
            >
              Action
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="text-[.6rem] lg:text-sm">{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default TableDokters;
