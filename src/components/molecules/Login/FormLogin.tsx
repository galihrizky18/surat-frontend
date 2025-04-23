"use client";
import React, { useEffect, useState } from "react";
import { Input, PasswordInput } from "@mantine/core";
import {
  IconMail,
  IconEyeCheck,
  IconEyeOff,
  IconLock,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import useUserStore from "@/state/zustand/store/userStore";

const FormLogin = () => {
  const router = useRouter();

  const setUserId = useUserStore((state) => state.setUserID);
  const setRole = useUserStore((state) => state.setRole);

  useEffect(() => {
    setRole("admin");
  }, []);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
    reveal ? (
      <IconEyeOff
        style={{
          width: "var(--psi-icon-size)",
          height: "var(--psi-icon-size)",
        }}
      />
    ) : (
      <IconEyeCheck
        style={{
          width: "var(--psi-icon-size)",
          height: "var(--psi-icon-size)",
        }}
      />
    );

  const handleSubmit = async () => {
    if (username === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops... Gagal Login",
        text: "Username dan Password tidak boleh kosong",
      });
      return;
    }

    Swal.fire({
      title: "Proses Login",
      text: "Harap Bersabar 😘",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/login`,
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      const { success, token, message, userLogin, role } = response.data;

      if (success) {
        if (token) {
          Cookies.set("token", token);
          Cookies.set("user", userLogin);
          setUserId(userLogin);
          setRole(role);
          router.push("/admin");
        } else {
          Swal.fire({
            icon: "error",
            title: "Token Tidak Ditemukan",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops... Gagal Login",
          text: message,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          icon: "error",
          title: "Oops... Gagal Login",
          text: error.response?.data?.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan sistem",
        });
      }
    }
  };

  return (
    <div className="p-3 flex flex-col gap-3 w-full h-full justify-center broder border-black">
      <div className="header font-monserat flex flex-col gap-2 items-center justify-center">
        <h1 className=" font-black text-2xl text-sky-400 text-center">
          Welcome To My Website
        </h1>
        <p className="text-xs">Login with email</p>
      </div>

      {/* Form */}
      <form
        className="flex flex-col mt-7 gap-5 items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col px-5 md:px-0 gap-2 w-full items-center justify-center">
          <div className="w-full md:w-[70%]">
            <Input
              placeholder="Your Username"
              leftSection={<IconMail stroke={2} />}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="w-full md:w-[70%]">
            <PasswordInput
              mx="auto"
              leftSection={<IconLock stroke={2} />}
              placeholder="Password"
              defaultValue=""
              visibilityToggleIcon={VisibilityToggleIcon}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="w-full px-5 md:px-0 md:w-[70%] flex flex-col gap-3 justify-end items-end">
          <p className="text-xs text-blue-500 cursor-pointer">Create Account</p>
          <button
            type="submit"
            className="w-full font-bold text-xl bg-sky-400 text-white rounded-lg p-2 cursor-pointer "
            disabled={loading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
