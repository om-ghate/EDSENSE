import React from "react";

import AreaGraph from "../AreaGraph";
import PieChart from "../PieChart";

const GraphDisplay = ({ stage, stageRef, countRef }) => {
  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          margin: "50px auto",
          textDecoration: "underline",
        }}
      >
        Level-wise Scores Graph for {stage}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "70px",
          margin: " 100px 0px",
          padding: "20px",
        }}
      >
        <div>
          <AreaGraph
            stage="Addition"
            stageRef={stageRef}
            style={{ width: "100%", height: "300px" }} // Adjust the width and height as needed
          />
        </div>
        <div>
          <PieChart
            countRef={countRef}
            style={{ width: "100%", height: "300px" }} // Adjust the width and height as needed
          />
        </div>
      </div>
    </div>
  );
};

export default GraphDisplay;
