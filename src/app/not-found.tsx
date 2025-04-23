"use client";
import React from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/admin");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        Oops... Halaman yang Anda cari tidak ditemukan.
      </p>
      <button
        className="mt-5 bg-blue-400 rounded-lg px-3 py-2 text-white cursor-pointer hover:font-bold"
        onClick={handleBack}
      >
        Dashboard
      </button>
    </div>
  );
};

export default NotFound;
