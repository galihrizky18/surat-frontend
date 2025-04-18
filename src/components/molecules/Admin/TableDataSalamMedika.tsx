"use client";
import React, { useEffect, useState } from "react";
import { Table, Button } from "@mantine/core";
import axios from "axios";

import { ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import {
  IconPrinter,
  IconTrash,
  IconFileDescription,
} from "@tabler/icons-react";
import Swal from "sweetalert2";

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
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [surat, setSurat] = useState<typeSurat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${apiHost}/surat-salam`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.data.success && Array.isArray(response.data.data)) {
            const convertData = response.data.data.map(
              (data: typeGetSurat) => ({
                id: data.id,
                no_surat: data.no_surat,
                nama_pasien: data.nama,
                mulai: data.mulai,
                sampai: data.sampai,
                dokter: data.dokters.nama,
              })
            );

            setSurat(convertData);
          }
        })
        .catch((e) => {
          console.error("Error fetching data:", e);
        });
    };

    fetchData();
  }, []);

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

  const rows = surat.map((data) => (
    <Table.Tr key={data.id}>
      <Table.Td className="truncate">{data.no_surat}</Table.Td>
      <Table.Td className="truncate">{data.nama_pasien}</Table.Td>
      <Table.Td className="truncate">{data.sampai}</Table.Td>
      <Table.Td className="truncate">{data.mulai}</Table.Td>
      <Table.Td className="grid grid-cols-1  gap-1">
        <Button
          leftSection={<IconFileDescription size={isSmallScreen ? 15 : 18} />}
          variant="filled"
          color="#007bff"
          size="xs"
        >
          <span className="text-[.7rem] lg:text-base">Detail</span>
        </Button>
        <Button
          leftSection={<IconPrinter size={isSmallScreen ? 15 : 18} />}
          variant="filled"
          color="#28a745"
          size="xs"
        >
          <span className="text-[.7rem] lg:text-base">Cetak Surat</span>
        </Button>
        <Button
          leftSection={<IconTrash size={isSmallScreen ? 15 : 18} />}
          variant="filled"
          color="#dc3545"
          size="xs"
          onClick={() => {
            handleDelete(data.id);
          }}
        >
          <span className="text-[.7rem] lg:text-base">Delete</span>
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea
      w={isSmallScreen ? 300 : "100%"}
      h={isSmallScreen ? 300 : "100%"}
      className=""
    >
      <Table stickyHeader>
        <Table.Thead className="text-xs lg:text-base">
          <Table.Tr>
            <Table.Th className="w-[15%] ">No Surat</Table.Th>
            <Table.Th className="w-[25%] ">Nama Pasien</Table.Th>
            <Table.Th className="w-[15%] ">Mulai</Table.Th>
            <Table.Th className="w-[15%] ">Sampai</Table.Th>
            <Table.Th className="w-[15%] ">Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Caption>Data Surat Sakit</Table.Caption>
      </Table>
    </ScrollArea>
  );
};

export default TableDataSalamMedika;
