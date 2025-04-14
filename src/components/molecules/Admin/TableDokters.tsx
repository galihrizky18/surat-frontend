"use client";
import React, { useEffect, useState } from "react";
import { Table, Button } from "@mantine/core";
import axios from "axios";
import { IconPencilCode, IconTrash } from "@tabler/icons-react";
import Swal from "sweetalert2";
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
  const [dokters, setDokters] = useState<Dokter[]>([]);

  const handleDelete = async (id: string) => {
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
        const response = await axios.delete(`${apiHost}/dokter/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const rows = dokters.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.nip}</Table.Td>
      <Table.Td>{element.nama}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td className="flex flex-row gap-2">
        <Button
          leftSection={<IconPencilCode size={18} />}
          variant="filled"
          color="#007bff"
          size="xs"
        >
          Edit
        </Button>
        <Button
          leftSection={<IconTrash size={18} />}
          variant="filled"
          color="#dc3545"
          size="xs"
          onClick={() => {
            handleDelete(element.id);
          }}
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={60} striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="w-[35%] lg:w-[25%] ">NIP</Table.Th>
          <Table.Th className="w-[40%] lg:w-[50%] ">Nama</Table.Th>
          <Table.Th className="w-[10%] ">Status</Table.Th>
          <Table.Th className="w-[15%] ">Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Caption>Data Dokters</Table.Caption>
    </Table>
  );
};

export default TableDokters;
