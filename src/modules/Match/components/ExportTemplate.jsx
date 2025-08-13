import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportTemplate = () => {
  const generateTemplate = () => {
    const headers = [
      "locationAR",
      "locationEN",
      "homeTeam",
      "awayTeam",
      "result.homeScore",
      "result.awayScore",
      "videos",
      "photo",
      "images",
      "date",
    ];

    const data = [
      {
        locationAR: "",
        locationEN: "",
        homeTeam: "",
        awayTeam: "",
        "result.homeScore": "",
        "result.awayScore": "",
        videos: "",
        photo: "",
        images: "",
        date: "",
      },
    ];

    const worksheetData = [
      headers,
      ...data.map((row) => headers.map((header) => row[header] || "")),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template");

    const wbout = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, "matches_template.xlsx");
  };

  return (
 <button
  onClick={generateTemplate}
  type="button"
  className="btn btn-sm btn-outline btn-primary h-8 flex items-center gap-2 capitalize"
>
  Download Excel Template
</button>

  );
};

export default ExportTemplate;
