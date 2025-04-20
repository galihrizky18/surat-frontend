import AdminTemplate from "@/components/template/AdminTemplate";
import React from "react";

import TableDokters from "@/components/molecules/Admin/TableDokters";
import ModalAddDokter from "@/components/organisms/Admin/Modal/ModalAddDokter";

const page = () => {
  return (
    <AdminTemplate title="Master Data - Dokter">
      <div className="bg-white px-2 lg:px-4 py-3 flex flex-col gap-3 rounded-lg shadow-lg">
        {/* header */}
        <div>
          <ModalAddDokter />
        </div>

        {/* Datatable */}
        <div className="">
          <TableDokters />
        </div>
      </div>
    </AdminTemplate>
  );
};

export default page;
