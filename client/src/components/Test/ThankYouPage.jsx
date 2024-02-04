import PdfGenerator from "./PDF Download/PdfGenerator";

const ThankYouPage = (props) => {
  const countRef = props.countRef;
  const stageRef = props.stageRef;
  const arrayStage = props.arrayStage;

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
        <PdfGenerator countRef={countRef} stageRef={stageRef} arrayStage={arrayStage}/>
      </div>
    </div>
  );
};

export default ThankYouPage;
