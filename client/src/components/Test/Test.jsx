import React, { useEffect, useState } from "react";
import "./Test.css"; // chal rha hai part 1
import data from "./data.json"; // Assuming that the data.json file is in the same directory as this component
// import Header from "./Header";
import axios from "axios";
import ExhaustPage from "./ExhaustPage";
import ThankYouPage from "./ThankYouPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const ansQues = [];
const arr_c = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]; //This is the array which will have numbers from 1 to 20
const array = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

// ---------- Array Creation to store the answer ------------------------------------------------------------------------------

const Q_arr = []; //Array to store the path which system takes
const R_ans = []; //Array to store right ans
const W_ans = []; //Array to store wrong ans
const SpW_ans = []; //Array to store Specific wrong ans

//
const Timer = []; // Array to store Timer
//

// ---------- Array Creation to store the answer End ----------------------------------------------------------------------------

const payload = JSON.parse(localStorage.getItem("payload"));
console.log(payload);
const Test = () => {
  const [exhaust, setExhaust] = useState(false);
  const [gameover, setGameover] = useState(false);
  const [stage, setStage] = useState(1);
  const [dec, setDec] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  // const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [level, setLevel] = useState(1);
  const [pointer, setPointer] = useState(1);
  const [started, setStarted] = useState(false); // Added state for tracking quiz start
  //   const arr = [
  //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  //   ]; //The array on which almost all the basic operation will be done
  // Function to handle input change

  // Use States for Response Time module -------------------------------------------------------------------------------------------------

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Use States End ----------------------------------------------------------------------------------------------------------------------

  // Result Stored
  // const [Result,setResult] = useState("");
  //

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };
  //   const filteredData = data.filter(
  //     (question) => question.stage === stage && question.level === level
  //   );
  // Function to generate a random question

  const generateQuestion = () => {
    if (array.length > 0 && pointer <= 3 && stage < 4) {
      const randomIndex = Math.floor(Math.random() * array.length);
      console.log(randomIndex);
      const Q_no = array[randomIndex];
      const str = stage
        .toString()
        .concat(
          ".",
          level.toString().concat(".", array[randomIndex].toString())
        );

      Q_arr.push(str);
      console.log("Q_arr", Q_arr);
      array.splice(randomIndex, 1);
      const filteredData = data.filter(
        (question) =>
          question.stage === stage &&
          question.level === level &&
          question.Q_no === Q_no
      );
      console.log(filteredData);

      // Test for making questionaire as a string

      // const randomNumber = array[randomIndex];
      setCurrentQuestion(filteredData[0]);

      //! --------------- Line 75 - String Requirement for text to speech:  ------------------------------------------------

      let str2 = filteredData[0].num1
        .toString()
        .concat(
          " ",
          filteredData[0].sign
            .toString()
            .concat(" ", filteredData[0].num2.toString().concat(" = to "))
        );

      // Convert str2 into speech
      let speech = new SpeechSynthesisUtterance(str2);
      window.speechSynthesis.speak(speech);

      // -------------------------------------------------------------------------------------------------------------------

      // if(randomIndex == arr.includes(randomIndex))
      // if (array.includes(randomNumber)) {
      //   console.log(randomNumber);
      //   setCurrentQuestion(filteredData[randomNumber]);
      //   array.splice(randomNumber, 1);
      // } else {
      //   generateQuestion();
      // }
      setAnswer("");
      // setResult("");
      // ansQues.push(filteredData[randomIndex].Q_no);
      console.log(array);
    } else {
      console.log("Exhausted Array");
      setExhaust(true);
      sendUserResult();
    }
  };

  // * ---------- Function to check the answer ----------------------------------------------------------------------
  const checkAnswer = () => {
    console.log(pointer);

    if (currentQuestion && parseInt(answer) === currentQuestion.ans) {
      R_ans.push(Q_arr[Q_arr.length - 1]);
      console.log("R_ans: ", R_ans);
      // setResult("Correct!");
      setPointer(pointer + 1);
      console.log("Pointer - " + pointer);
    } else if (
      currentQuestion &&
      (parseInt(answer) === currentQuestion.swa1 ||
        parseInt(answer) === currentQuestion.swa2 ||
        parseInt(answer) === currentQuestion.swa3 ||
        parseInt(answer) === currentQuestion.swa4 ||
        parseInt(answer) === currentQuestion.swa5)
    ) {
      SpW_ans.push(Q_arr[Q_arr.length - 1]);
      setPointer(pointer - dec);
      setDec(dec + 2);
      console.log("Points", pointer);
      console.log("SpW_ans: ", SpW_ans);
    } else {
      W_ans.push(Q_arr[Q_arr.length - 1]);
      console.log("W_ans: ", W_ans);
    }
  };

  // * ---------- Function to check the answer End -------------------------------------------------------------------

  // List of this required for the code to work

  /*
1. Handle Level Change which will handle the level change after solving 3 questions of each level
2. Handle Stage Change which will handle the stage change after giving 3 level of each stage
3. Handle Test Complete which will set setGameover(true) after 3 stages
*/

  /*
Starting Point -

Pointer - 0
Level - 0
Stage - 0
array - 5

Successful Case
Pointer - 3 
Level - 3
Stage - 3

Unsuccessful case
Pointer < 3
Array - 0
*/

  // ! Handle Level Change function and useState

  useEffect(() => {
    if (pointer === 3 && level < 3) {
      handleLevelChange();
    }
  }, [pointer]);

  const handleLevelChange = () => {
    setPointer(0);
    setDec(1);
    setLevel(level + 1);

    for (let i = 0; i < arr_c.length; i++) {
      array[i] = arr_c[i];
    }
  };

  // ! Handle Level Change function and useState END

  // ! Handle Stage Change function and useState

  useEffect(() => {
    if (pointer === 3 && level === 3 && stage < 3) {
      handleStageChange();
    }
  }, [pointer]);

  const handleStageChange = () => {
    setPointer(0);
    setDec(1);
    setLevel(1);
    setStage(stage + 1);

    for (let i = 0; i < arr_c.length; i++) {
      array[i] = arr_c[i];
    }
  };

  // ! Handle Stage Change function and useState END

  // Code by Om - 5th July
  // ! Handle Test Complete function and useState
  useEffect(() => {
    if (pointer === 4 && level === 3 && stage === 3) {
      handleTestComplete();
    }
  }, [pointer]);

  const handleTestComplete = () => {
    R_ans.push(Q_arr[Q_arr.length - 1]);

    let str = minutes.toString().concat(":", seconds.toString());
    Timer.push(str);

    setGameover(true);
    sendUserResult();
  };

  // ! Handle Test Complete function and useState END
  // Code by Om - 5th July END

  // Code by Om - 11th July

  //! This function works on adding autoFocus everytime the page reloads and a new question is generated

  useEffect(() => {
    const inputElement = document.querySelector('input[type="number"]');
    if (inputElement) {
      inputElement.focus();
    }
  }, [pointer]);

  // Code by Om - 11th July

  // Effect to handle level change when pointer reaches 12

  //! Repeated Code - I Think
  // useEffect(() => {
  //   // else{
  //   //   setGameover(true)
  //   // }
  //   const handleLevelChange = () => {
  //     setLevel(level + 1);
  //     setPointer(0);
  //     setDec(1);
  //     for (let i = 0; i < arr_c.length; i++) {
  //       array[i] = arr_c[i];
  //     }
  //   };
  //   if (pointer >= 4 && level < 2) {
  //     // for(int)
  //     handleLevelChange();
  //   }
  // }, [pointer, level]);

  // ! Repeated Code End

  //! Array Exhausted

  useEffect(() => {
    if (array.length === 0 && pointer < 3) {
      setExhaust(true);
    }
  }, [pointer]);

  // ! Array Exhausted End

  // UseEffect and Restart fuction for Response time ------------------------------------------------------------------------------------------

  var timer;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timer = setInterval(() => {
      setSeconds(seconds + 1);

      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  });

  const restart = () => {
    let str = minutes.toString().concat(":", seconds.toString());
    Timer.push(str);
    // console.log("Timer - "+Timer)
    console.log("Timer : ", Timer);
    setSeconds(0);
    setMinutes(0);
  };

  // Restart Func and Use Effect End ----------------------------------------------------------------------------------------------------------

  // Function to start the quiz
  const startQuiz = () => {
    setStarted(true);
    generateQuestion();
  };

  // Function to handle "Next" button click
  const handleNextButtonClick = () => {
    generateQuestion();
  };

  // Render start screen if quiz has not started
  if (!started) {
    return (
      <div className="start">
        <div className="start-inner">
          <h1>Welcome to the Quiz!</h1>
          <p>Click the button below to start the quiz.</p>
          <div className="start-btn-class">
            <button className="start-btn" onClick={startQuiz}>
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const sendUserResult = async (e) => {
    try {
      const url = "http://localhost:8080/api/usersResult";
      const { data: res } = await axios.post(url, {
        email: payload.email,
        Q_arr: Q_arr,
        Timer: Timer,
        R_ans: R_ans,
        SpW_ans: SpW_ans,
        W_ans: W_ans,
        // Result: Result,
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleCombinedClick = () => {
    if (answer) {
      // Restart fuction added for response time module -------------------------------------------------------------------------
      restart();
      // Reponse time function end -----------------------------------------------------------------------------------------------

      checkAnswer();
      handleNextButtonClick();
      setError("");
    } else {
      toast.info("Please fill in this field");
      return;
    }
  };

  // Code by Om - 11th July

  //!  This function works on functionality that a student enters his answers and instead of clicking on the next question, he/she can simply click "Enter" and proceed to the next question
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCombinedClick();
    }
  };
  // Code by Om - 11th July
  // !------------------------ Main Display Page ---------------------------------------------------------------------

  return (
    <div className="Test">
      {!exhaust ? (
        <div>
          {!gameover ? (
            <div className="new">
              {currentQuestion ? (
                <div>
                  <div className="errorTextbox">
                    <p className={error ? "errorText" : ""}>{error}</p>
                  </div>
                  <div className="obox">
                    <div className="Mbox"> {currentQuestion.num1}</div>
                    <div className="Sign">{currentQuestion.sign}</div>
                    <div className="Mbox1"> {currentQuestion.num2}</div>
                    <div className="equals"> = </div>
                    <input
                      className="mbox2"
                      type="number"
                      onChange={handleInputChange}
                      value={answer}
                      autoFocus
                      onKeyDown={handleKeyDown}
                      required
                    />
                  </div>
                  <button className="button1" onClick={handleCombinedClick}>
                    Next Question
                  </button>
                </div>
              ) : (
                <div>
                  {/* setResult("Pass") */}
                  <ThankYouPage />
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* setResult("Pass") */}
              <ThankYouPage />
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* setResult("Fail") */}
          <ExhaustPage />
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* Toast Container END */}
    </div>
  );

  // ------------------------------------------------------------------------------------------------------------------
};

export default Test;
