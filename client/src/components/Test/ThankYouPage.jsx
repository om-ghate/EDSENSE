import React, { useState } from "react";
import AreaGraph from "./AreaGraph";
import PdfGenerator from "./PDF Download/PdfGenerator";

const ThankYouPage = (props) => {
  const [showPdf, setShowPdf] = useState(false);

  const handleGeneratePdf = () => {
    setShowPdf(true);
  };

  const countRef = props.countRef;
  const stageRef = props.stageRef;

  console.log("Thank you Page displayed -");
  console.log(countRef);
  console.log(stageRef);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("payload");
    window.location.reload();
  };

  return (
    <div className="graph-display">
      <div
        className="thankyou-container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ marginTop: "100px", marginBottom: "20px" }}>
          <AreaGraph
            stage="Addition"
            countRef={countRef}
            stageRef={stageRef[1]}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <AreaGraph
            stage="Subtraction"
            countRef={countRef}
            stageRef={stageRef[2]}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <AreaGraph
            stage="Multiplication"
            countRef={countRef}
            stageRef={stageRef[3]}
          />
        </div>
      </div>
      <button className="logOutButton" onClick={handleLogout}>
        Exit Test
      </button>
      {showPdf ? (
        <PdfGenerator />
      ) : (
        <button onClick={handleGeneratePdf}>
          Generate PDF
        </button>
      )}

    </div>
  );
};

export default ThankYouPage;