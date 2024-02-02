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

      <button className="logOutButton" onClick={handleLogout}>
        Exit Test
      </button>
      {showPdf ? (
        <PdfGenerator countRef = {countRef} stageRef= {stageRef[1]}/>
      ) : (
        <button onClick={handleGeneratePdf}>
          Generate PDF
        </button>
      )}

    </div>
  );
};

export default ThankYouPage;