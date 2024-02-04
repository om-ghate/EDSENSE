import React, { useRef } from "react";
import AreaGraph from "../AreaGraph";
import PieChart from "../PieChart";
import { useReactToPrint } from "react-to-print";

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
        <h2
          style={{
            textAlign: "center",
            margin: "50px auto",
          }}
        >
          Level-wise Scores Area Chart for Addition
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "70px",
            margin: " 100px 10px",
            padding: "20px",
          }}
        >
          <div>
            <AreaGraph
              stage="Addition"
              stageRef={stageRef[1]}
              style={{ width: "100%", height: "300px" }} // Adjust the width and height as needed
            />
          </div>
          <div>
            <PieChart
              countRef={countRef[1]}
              style={{ width: "100%", height: "300px" }} // Adjust the width and height as needed
            />
          </div>
        </div>
        <h2
          style={{
            textAlign: "center",
            margin: "50px auto",
          }}
        >
          Level-wise Scores Area Chart for Subtraction
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "70px",
            margin: " 100px 10px",
            padding: "20px",
          }}
        >
          <div>
            <AreaGraph
              stage="Subtraction"
              stageRef={stageRef[2]}
              style={{ width: "100%", height: "300px" }} // Adjust the width and height as needed
            />
          </div>
          <div>
            <PieChart
              countRef={countRef[2]}
              style={{ width: "100%", height: "300px" }} // Adjust the width and height as needed
            />
          </div>
        </div>
        <h2
          style={{
            textAlign: "center",
            margin: "50px auto",
            paddingTop: "30px",
          }}
        >
          Level-wise Scores Area Chart for Multiplication
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "70px",
            margin: " 100px 10px",
            padding: "20px",
            
          }}
        >
          <div>
            <AreaGraph
              stage="Multiplication"
              stageRef={stageRef[3]}
              style={{ width: "100%", height: "300px" }} // Adjust the width and height as needed
            />
          </div>
          <div>
            <PieChart
              countRef={countRef[3]}
              style={{ width: "100%", height: "300px" }} // Adjust the width and height as needed
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            height: "50px",
            width: "150px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            fontSize: "16px",
            borderRadius: "5px",
            margin: "0 10px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Exit Test
        </button>

        <button
          onClick={handlePrint}
          style={{
            height: "50px",
            width: "150px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            fontSize: "16px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default PdfGenerator;
