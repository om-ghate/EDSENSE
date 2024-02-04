import React, { useRef } from "react";
import AreaGraph from "../AreaGraph";
import PieChart from "../PieChart";
import { useReactToPrint } from "react-to-print";
import GraphDisplay from "./GraphDisplay";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("payload");
  window.location.reload();
};

const PdfGenerator = ({ countRef, stageRef }) => {
  const data = localStorage.getItem("payload");
  const { firstName, lastName, school, std } = JSON.parse(data);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        maxWidth: "1150px",
        margin: "0 auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      }}
    >
      <div
        ref={componentRef}
        style={{
          borderRadius: "5px",
          backgroundColor: "white",
          width: "100%",
          height: "auto",
          padding: "20px",
        }}
      >
        <h2
          style={{
            color: "#3498db",
            padding: "20px",
            borderBottom: "2px solid #3498db",
            paddingBottom: "40px",
            fontSize: "24px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          Test Report
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            padding: "20px",
          }}
        >
          <h4>Name: {firstName + " " + lastName}</h4>
          <h4>School: {school}</h4>
          <h4>Standard: {std}</h4>
        </div>

        <div
          style={{
            borderBottom: "2px solid #3498db",
          }}
        ></div>

        <GraphDisplay
          stage="Addition"
          stageRef={stageRef[1]}
          countRef={countRef[1]}
        />
        <GraphDisplay
          stage="Subtraction"
          stageRef={stageRef[2]}
          countRef={countRef[2]}
        />
        <GraphDisplay
          stage="Multiplication"
          stageRef={stageRef[3]}
          countRef={countRef[3]}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "100px",
        }}
      >
        <button
          style={{
            height: "100px",
            width: "250px",
            backgroundColor: "white",
            color: "#3498db",
            border: "3px solid #3498db",
            fontSize: "30px",
            borderRadius: "5px",
            margin: "0 40px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#3498db";
            e.currentTarget.style.color = "white";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "white";
            e.currentTarget.style.color = "#3498db";
          }}
        >
          Exit Test
        </button>

        <button
          onClick={handlePrint}
          style={{
            height: "100px",
            width: "250px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            fontSize: "30px",
            borderRadius: "5px",
            margin: "0 40px",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default PdfGenerator;
