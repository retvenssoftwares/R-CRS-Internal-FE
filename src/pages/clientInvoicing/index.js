import React, { useRef, useState } from "react";
import DashboardLayout from "../../components/layout/dashboardLayout";
import jsPDF from "jspdf";
import { Button, Typography } from "@material-ui/core";

const ClientInvoicing = () => {
  return (
    <>
      <Typography variant="h4" style={{fontWeight:700,textAlign:'center',color:'#9ccf2a'}}>
        Download Invoices
      </Typography>
      <JsonToPdfDownload />
    </>
  );
};

export default ClientInvoicing;

function JsonToPdfDownload() {
  const handleDownloadPdf = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Sample JSON data (replace with your own data)
    const jsonData = {
      name: "John Doe",
      email: "john@example.com",
      age: 30,
      country: "USA",
    };

    // Convert JSON to a string representation
    const jsonString = JSON.stringify(jsonData, null, 4);

    // Add the JSON data to the PDF
    pdf.text(10, 10, "JSON to PDF Example");
    pdf.text(10, 20, jsonString);

    // Save the PDF as a blob
    const blob = pdf.output("blob");

    // Create a download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "json_to_pdf.pdf";

    // Trigger the download
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
  };
  const ref = useRef();
  const handleDownload = () => {
    const content = ref.current;

    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
      html2canvas: { scale: 0.5 }, // change the scale to whatever number you need
    });
  };
  return (
    <div>
      <Button variant="outlined" style={{background:'#1a51b2',color:'white'}} onClick={handleDownload}>Download PDF</Button>
      <div ref={ref}>
        <h1>JSON to PDF Download</h1>
      </div>
    </div>
  );
}
