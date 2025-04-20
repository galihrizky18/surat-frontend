import AdminTemplate from "@/components/template/AdminTemplate";
import React from "react";

import TableDataSalamMedika from "@/components/molecules/Admin/TableDataSalamMedika";
import ModalCreateSalamMedika from "@/components/organisms/Admin/Modal/ModalCreateSalamMedika";

const page = () => {
  return (
    <AdminTemplate title="Surat Salam Medika">
      <div className="bg-white px-2 lg:px-4 py-3 flex flex-col gap-3 rounded-lg shadow-lg">
        {/* Top */}
        <div className="">
          <ModalCreateSalamMedika />
        </div>

        {/* Table */}
        <div>
          <TableDataSalamMedika />
        </div>
      </div>
    </AdminTemplate>
  );
};

export default page;
