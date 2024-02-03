import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AreaGraph from "../AreaGraph";
import PieChart from "../PieChart";

const PdfGenerator = ({ countRef, stageRef }) => {
  const data = localStorage.getItem("payload");
  const { age, email, firstName, lastName, school, std } = JSON.parse(data);

  const pdfRef = useRef();

  const generatePdf = async () => {
    const input = pdfRef.current;

    try {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 200;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.setFillColor(255, 255, 255);
      pdf.rect(
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight(),
        "F"
      );

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${firstName + lastName}_report.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "white",
        textAlign: "center",
      }}
    >
      <div
        ref={pdfRef}
        style={{
          padding: 0,
          margin: 0,
          borderRadius: "5px",
          backgroundColor: "white",
          width: "100%",
          height: "auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            color: " #3498db",
            padding: "20px",
            borderBottom: "2px solid #3498db",
            paddingBottom: "10px",
          }}
        >
          Test Report
        </h2>
        {/* <h3>Student Information</h3> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            padding: "20px",
          }}
        >
          <h4>Name - {firstName + " " + lastName}</h4>
          <h4>Age - {age}</h4>
          <h4>Email - {email}</h4>
          <h4>School - {school}</h4>
          <h4>Standard - {std}</h4>
        </div>

        <hr />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "100px",
          }}
        >
          <AreaGraph stage="Addition" stageRef={stageRef[1]} />
          <PieChart countRef={countRef[1]} />
        </div>

        <div style={{ display: "flex", flexDirection: "row", margin: "100px" }}>
          <AreaGraph stage="Subtraction" stageRef={stageRef[2]} />
          <PieChart countRef={countRef[2]} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", margin: "100px" }}>
          <AreaGraph stage="Multiplication" stageRef={stageRef[3]} />
          <PieChart countRef={countRef[3]} />
        </div>
      </div>

      <button
        onClick={async () => {
          await generatePdf();
        }}
        style={{
          padding: "30px 45px",
          fontSize: "x-large",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "100px",
        }}
      >
        Generate PDF
      </button>
    </div>
  );
};

export default PdfGenerator;
