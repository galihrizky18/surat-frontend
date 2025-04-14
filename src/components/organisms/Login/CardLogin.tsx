import CaraoselLogin from "@/components/molecules/Login/CaraoselLogin";
import FormLogin from "@/components/molecules/Login/FormLogin";
import React from "react";

const CardLogin = () => {
  return (
    <div className="w-full mx-5  md:mx-0 md:w-[70%] md:h-[70%] md:grid md:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="hidden md:block">
        <CaraoselLogin />{" "}
      </div>
      <div className="flex flex-col w-full h-full items-center justify-center ">
        <FormLogin />
      </div>
    </div>
  );
};

export default CardLogin;
