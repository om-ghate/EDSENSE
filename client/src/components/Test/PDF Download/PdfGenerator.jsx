import React, { useRef } from "react";
import BarGraph from "../Graphs/BarGraph";
import { useReactToPrint } from "react-to-print";
import Header from "./Header";
import Student from "./Student";
import Percentage from "./Percentage";
import Result from "./Result";
import Graphs from "./Graphs";
import Logout from "./Buttons/Logout";



const PdfGenerator = ({ countRef, stageRef, arrayStage }) => {
  var finalScore =
    ((arrayStage[0] + arrayStage[1] + arrayStage[2]) / (52.8 + 52.8 + 19.8)) *
    100;
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
        <Header /> {/* Displays the Title */}
        <Student /> {/* Displays the Student Details */}
        <Graphs stageRef={stageRef} countRef={countRef} /> {/* Graph Display */}
        <BarGraph arrayStage={arrayStage} /> {/* Stage Wise Total Score */}
        <Percentage arrayStage={arrayStage} finalScore={finalScore} />
        {/* Total Percentage */}
        <Result finalScore={finalScore} /> {/* Final Decision */}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "100px",
        }}
      >
        {/* Logout Button */}
        <Logout />

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
