import React from "react";
import AreaGraph from "./AreaGraph";

const ThankYouPage = (props) => {
  const countRef = props.countRef;
  const stageRef = props.stageRef;
  
  console.log("Thank you Page displayed -")
  console.log(countRef);
  console.log(stageRef);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("payload");
    window.location.reload();
  };
  return (
    <div className="thankyou-container">
      {/* <h1 className="thankyou-title">Thank You!</h1>
      <p className="thankyou-text">
        Your test has been completed successfully.
      </p> */}
      {/* <p className="thankyou-text">Thank you for participating!</p> */}
      {/* Add any additional content or styling as needed */}

      <AreaGraph countRef = {countRef} stageRef = {stageRef}/>

      <button onClick={handleLogout}>
					Exit Test
				</button>
    </div>
  );
};

export default ThankYouPage;
