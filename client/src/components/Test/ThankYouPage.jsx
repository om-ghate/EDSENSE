import React, { useState } from "react";
import PdfGenerator from "./PDF Download/PdfGenerator";

const ThankYouPage = (props) => {

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

      <PdfGenerator countRef={countRef} stageRef={stageRef} />
    </div>
  );
};

export default ThankYouPage;
