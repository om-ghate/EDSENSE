import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PdfGenerator = () => {
  const pdfRef = useRef();

  const generatePdf = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("test_report.pdf");
    });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2
        style={{
          color: "#333",
          borderBottom: "2px solid #333",
          paddingBottom: "10px",
        }}
      >
        Test Report
      </h2>
      <div
        ref={pdfRef}
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          margin: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ color: "#555", marginBottom: "15px" }}>Summary</h3>
        <p style={{ margin: "5px" }}>Test Date: January 1, 2024</p>
        <p style={{ margin: "5px" }}>Tester: John Doe</p>

        <h3 style={{ color: "#555", marginTop: "20px", marginBottom: "15px" }}>
          Test Results
        </h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#333", color: "#fff" }}>
              <th style={{ padding: "10px" }}>Test Case</th>
              <th style={{ padding: "10px" }}>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>Test Case 1</td>
              <td style={{ padding: "10px", color: "green" }}>Pass</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Test Case 2</td>
              <td style={{ padding: "10px", color: "red" }}>Fail</td>
            </tr>
            {/* Add more test cases as needed */}
          </tbody>
        </table>
      </div>
      <button
        onClick={generatePdf}
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate PDF
      </button>
    </div>
  );
};

export default PdfGenerator;
