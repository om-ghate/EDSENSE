import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import AreaGraph from "../AreaGraph";
import PieChart from "../PieChart";

const PdfGenerator = ({ countRef, stageRef }) => {
  const data = localStorage.getItem("payload");
  const { age, email, firstName, lastName, school, std } = JSON.parse(data);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "white", textAlign: "center" }}>
      <div
        ref={componentRef}
        style={{
          padding: "2%",
          margin: "2%",
          borderRadius: "5px",
          backgroundColor: "white",
          width: "96%",
          height: "auto",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            color: " #3498db",
            padding: "2%",
            borderBottom: "2px solid #3498db",
            paddingBottom: "1%",
          }}
        >
          Test Report
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            padding: "2%",
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
            margin: "5%",
          }}
        >
          <AreaGraph stage="Addition" stageRef={stageRef[1]} />
          <PieChart countRef={countRef[1]} />
        </div>

        <div style={{ display: "flex", flexDirection: "row", margin: "5%" }}>
          <AreaGraph stage="Subtraction" stageRef={stageRef[2]} />
          <PieChart countRef={countRef[2]} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", margin: "5%" }}>
          <AreaGraph stage="Multiplication" stageRef={stageRef[3]} />
          <PieChart countRef={countRef[3]} />
        </div>
      </div>

      <button
        onClick={handlePrint}
        style={{
          padding: "3% 5%",
          fontSize: "x-large",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "5%",
        }}
      >
        Generate PDF
      </button>
    </div>
  );
};

export default PdfGenerator;