"use client";
import React from "react";
import { Input, PasswordInput } from "@mantine/core";
import {
  IconMail,
  IconEyeCheck,
  IconEyeOff,
  IconLock,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const router = useRouter();

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

  const handleSubmit = () => {
    console.log("Form Submitted");

    router.push("/admin");
  };
  return (
    <div className="p-3 flex flex-col gap-3 w-full h-full justify-center broder border-black">
      <div className="header font-monserat flex flex-col gap-2 items-center justify-center">
        <h1 className=" font-black text-2xl text-sky-400">
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
              placeholder="Your Email"
              leftSection={<IconMail stroke={2} />}
            />
          </div>
          <div className="w-full md:w-[70%]">
            <PasswordInput
              mx="auto"
              leftSection={<IconLock stroke={2} />}
              placeholder="Password"
              defaultValue=""
              visibilityToggleIcon={VisibilityToggleIcon}
            />
          </div>
        </div>

        <div className="w-full px-5 md:px-0 md:w-[70%] flex flex-col gap-3 justify-end items-end">
          <p className="text-xs text-blue-500 cursor-pointer">Create Account</p>
          <button
            type="submit"
            className="w-full font-bold text-xl bg-sky-400 text-white rounded-lg p-2 cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
