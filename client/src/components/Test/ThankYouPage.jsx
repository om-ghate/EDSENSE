import React, { useState } from "react";
import PdfGenerator from "./PDF Download/PdfGenerator";

const ThankYouPage = (props) => {
  const countRef = props.countRef;
  const stageRef = props.stageRef;

  console.log("Thank you Page displayed -");
  console.log(countRef);
  console.log(stageRef);

  

  return (
    <div
      className="graph-display"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <div style={{ marginTop: "80px" }}></div>

      <div>
        <PdfGenerator countRef={countRef} stageRef={stageRef} />
      </div>
    </div>
  );
};

export default ThankYouPage;
