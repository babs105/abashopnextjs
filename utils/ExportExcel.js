import React from "react";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const ExportExcel = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  //   const header = [
  //     "ID",
  //     "date Ravitaillement",
  //     "Type Operation",
  //     "immatricule",
  //     "kilometrageCurrent",
  //     "Distance Parcourue",
  //     "quantityRavitaillement",
  //     "quantityCurrentCuve",
  //     "statut",
  //     "chauffeur",
  //     "categorie",
  //     "cuveName",
  //     "username",
  //     "heureOperation",
  //   ];

  const exportToXlsx = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);

    const wb = {
      Sheets: {
        data: ws,
      },

      SheetNames: ["data"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button
      className="btn btn-outline-success shadow-none"
      onClick={(e) => exportToXlsx(csvData, fileName)}
    >
      <i className="fa fa-fw fa-upload"></i>
      xlsx{" "}
    </button>
  );
};
