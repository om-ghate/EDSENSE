import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import AreaGraph from "../AreaGraph";
import PieChart from "../PieChart";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("payload");
  window.location.reload();
};

const PdfGenerator = ({ countRef, stageRef }) => {
  const data = localStorage.getItem("payload");
  const { age, email, firstName, lastName, school, std } = JSON.parse(data);

  const pdfRef = useRef();

  const generatePdf = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      // This variable is used to give margin in the pdf's top section
      const marginTop = 5;

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = marginTop;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(`${firstName + " " + lastName}_report.pdf`);
    });
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
        {/* <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontSize: "x-large",
          }}
        >
          <tbody>
            <tr>
              <td style={{ textAlign: "left", padding: "8px" }}>Name</td>
              <td style={{ textAlign: "left", padding: "8px" }}>
                {firstName} {lastName}
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "8px" }}>Age</td>
              <td style={{ textAlign: "left", padding: "8px" }}>{age}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "8px" }}>Email</td>
              <td style={{ textAlign: "left", padding: "8px" }}>{email}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "8px" }}>School</td>
              <td style={{ textAlign: "left", padding: "8px" }}>{school}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "8px" }}>Standard</td>
              <td style={{ textAlign: "left", padding: "8px" }}>{std}</td>
            </tr>
          </tbody>
        </table> */}

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "Center",
        }}
      >
        <button
          style={{
            height: "100px",
            width: "245px",
            backgroundColor: "white",
            color: "#42b2fc",
            border: "3px solid",
            fontSize: "xx-large",
            borderRadius: "10px",

            margin: "100px",
            padding: "20px 35px",
          }}
          onClick={handleLogout}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#42b2fc";
            e.currentTarget.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#42b2fc";
          }}
        >
          Exit Test
        </button>
        <button
          onClick={generatePdf}
          style={{
            height: "100px",
            width: "245px",

            padding: "30px 40px",
            fontSize: "x-large",
            backgroundColor: "#42b2fc",
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
    </div>
  );
};

export default PdfGenerator;
