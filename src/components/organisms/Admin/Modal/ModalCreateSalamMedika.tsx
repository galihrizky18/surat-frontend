"use client";
import React, { useEffect, useState } from "react";
import { IconPencilPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Input, Radio, Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import axios from "axios";
import Swal from "sweetalert2";
const apiHost = process.env.NEXT_PUBLIC_API_HOST;

interface typeDokters {
  id: string;
  nama: string;
}

const ModalCreateSalamMedika = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [tglLahir, setTglLahir] = useState<Date | null>(null);
  const [mulaiDari, setMulaiDari] = useState<Date | null>(new Date());
  const [sampai, setSampai] = useState<Date | null>(new Date());
  const [tglSurat, setTglSurat] = useState<Date | null>(new Date());

  const [nama, setNama] = useState<string>("");
  const [tempatLahir, setTempatLahir] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [alamat, setAlamat] = useState<string>("");
  const [Pekerjaan, setPekerjaan] = useState<string>("");
  const [diagnosa, setDiagnosa] = useState<string>("");
  const [kotaSurat, setKotaSurat] = useState<string>("");
  const [selectedDokter, setSelectedDokter] = useState<string | null>("");

  const [dataDokter, setDataDokter] = useState<
    { value: string; label: string }[]
  >([]);

  // GetDataDokters
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(`${apiHost}/dokter/active`)
          .then((data) => {
            const formattedData = data.data.data.map((data: typeDokters) => ({
              value: String(data.id),
              label: data.nama,
            }));
            setDataDokter(formattedData);
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    await axios
      .post(
        `${apiHost}/surat-salam/create`,
        {
          nama: nama,
          tempatLahir: tempatLahir,
          tanggal_lahir: convertDateFormat(
            (tglLahir!.toLocaleDateString("id-ID") || "").split("T")[0]
          ),
          jenis_kelamin: gender,
          alamat: alamat,
          pekerjaan: Pekerjaan,
          diagnosa: diagnosa,
          tanggal_mulai: convertDateFormat(
            (mulaiDari!.toLocaleDateString("id-ID") || "").split("T")[0]
          ),
          tanggal_sampai: convertDateFormat(
            (sampai?.toLocaleDateString("id-ID") || "").split("T")[0]
          ),
          kota_surat: kotaSurat,
          tanggal_surat: convertDateFormat(
            (tglSurat?.toLocaleDateString("id-ID") || "").split("T")[0]
          ),
          id_dokter: selectedDokter,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          Swal.fire({
            title: "Berhasil!",
            text: "Surat Berhasil Ditambah",
            icon: "success",
            confirmButtonText: "Oke",
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          title: "Gagal!",
          text: e.response.data.message,
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  const convertDateFormat = (date: string) => {
    const [day, month, year] = date.split("/");

    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <Button
        onClick={open}
        leftSection={<IconPencilPlus size={18} />}
        variant="filled"
        color="#007BFF"
        size="xs"
      >
        Buat Surat
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Buat Surat Sakit"
        size="70%"
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
          className="flex flex-col gap-3"
        >
          {/* Form */}
          <div className="flex flex-row  ">
            <div className="flex flex-col gap-2 w-[50%]">
              {/* Nama */}
              <div className="flex flex-col text-sm">
                <label htmlFor="">Nama</label>
                <Input
                  placeholder="Nama"
                  value={nama}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNama(e.target.value)
                  }
                />
              </div>

              {/* Tempat Tgl Lahir */}
              <div className="flex flex-row w-full gap-2 ">
                {/* Tempat Lahir */}
                <div className="flex flex-col text-sm w-full">
                  <label htmlFor="">Tempat Lahir</label>
                  <Input
                    placeholder="Tempat Lahir"
                    value={tempatLahir}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTempatLahir(e.target.value)
                    }
                  />
                </div>

                <div className="flex flex-col text-sm w-full">
                  <label htmlFor="">Tanggal Lahir</label>
                  <DateInput
                    value={tglLahir}
                    onChange={(date) => {
                      setTglLahir(date);
                    }}
                    placeholder="Tanggal Lahir"
                    clearable
                  />
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div className="flex flex-col text-sm ">
                <label htmlFor="">Jenis Kelamin</label>
                <Radio.Group
                  name="gender"
                  className="px-3 text-sm"
                  onChange={(e) => {
                    setGender(e);
                  }}
                >
                  <Group mt="xs" className="text-sm">
                    <Radio value="laki-laki" label="Laki-Laki" />
                    <Radio value="perempuan" label="Perempuan" />
                  </Group>
                </Radio.Group>
              </div>

              {/* Alamat */}
              <div className="flex flex-col text-sm">
                <label htmlFor="">Alamat</label>
                <Input
                  placeholder="Alamat"
                  value={alamat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAlamat(e.target.value)
                  }
                />
              </div>

              {/* Pekerjaan */}
              <div className="flex flex-col text-sm">
                <label htmlFor="">Pekerjaan</label>
                <Input
                  placeholder="Pekerjaan"
                  value={Pekerjaan}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPekerjaan(e.target.value)
                  }
                />
              </div>
            </div>

            {/* Garis abu-abu */}
            <div className="flex items-center justify-center w-[3%]">
              <div className="w-px h-full bg-gray-300"></div>{" "}
            </div>

            {/* ===SECTION 2=== */}
            <div className="flex flex-col gap-2 w-[50%]">
              {/* Diagnosa */}
              <div className="flex flex-col text-sm">
                <label htmlFor="">Diagnosa</label>
                <Input
                  placeholder="Diagnosa"
                  value={diagnosa}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDiagnosa(e.target.value)
                  }
                />
              </div>

              {/* Waktu Istirahat */}
              <div className="flex flex-row w-full gap-2 ">
                {/* Mulai Dari */}
                <div className="flex flex-col text-sm w-full">
                  <label htmlFor="">Mulai Dari</label>
                  <DateInput
                    value={mulaiDari}
                    onChange={(date) => {
                      setMulaiDari(date);
                    }}
                    placeholder="Mulai Dari"
                    clearable
                    defaultValue={new Date()}
                  />
                </div>

                {/* Sampai */}
                <div className="flex flex-col text-sm w-full">
                  <label htmlFor="">Sampai</label>
                  <DateInput
                    value={sampai}
                    onChange={(date) => {
                      setSampai(date);
                    }}
                    placeholder="Sampai"
                    clearable
                    defaultValue={new Date()}
                  />
                </div>
              </div>

              {/* Garis abu-abu */}
              <div className="flex items-center justify-center my-1 w-full">
                <div className="w-full h-[2px] bg-gray-300"></div>{" "}
              </div>

              {/* Kota Surat */}
              <div className="flex flex-col text-sm">
                <label htmlFor="">Kota Surat</label>
                <Input
                  placeholder="Kota Surat"
                  value={kotaSurat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setKotaSurat(e.target.value)
                  }
                />
              </div>

              {/* Tgl Surat */}
              <div className="flex flex-col text-sm w-full">
                <label htmlFor="">Tanggal Surat</label>
                <DateInput
                  value={tglSurat}
                  onChange={setTglSurat}
                  placeholder="Tanggal Surat"
                  clearable
                  defaultValue={new Date()}
                />
              </div>

              {/* Dokter */}
              <div className="flex flex-col text-sm w-full">
                <label htmlFor="">Dokter Pemeriksa</label>
                <Select
                  className="text-sm"
                  placeholder="Dokter Pemeriksa"
                  searchable
                  data={dataDokter}
                  onChange={(value) => {
                    setSelectedDokter(value);
                  }}
                />
              </div>
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

export default ModalCreateSalamMedika;
