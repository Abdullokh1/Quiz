import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../sass/index.scss";
const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tests } = location.state;
  const [testNum, setTestNum] = useState(0);
  const [allTests, setAllTests] = useState([]);
  const [statistcs, setStatistcs] = useState({
    totalScore: allTests.length,
    yourScore: 0,
    percent: 0,
  });
  const [modal, setModal] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswer] = useState("");

  const mapTests = () => {
    return tests.map((v, i) => {
      return {
        ...v,
        status: "",
        incorrect_answers: shuffleArr(v.incorrect_answers, v.correct_answer),
      };
    });
  };
  const shuffleArr = (incorrect_answers, correct_answer) => {
    let arr = [];
    for (let i = 0; i < incorrect_answers.length; i++) {
      arr.push({ status: "", text: incorrect_answers[i] });
    }
    arr.push({ status: "", text: correct_answer });
    return arr.sort(() => 0.5 - Math.random());
  };
  useEffect(() => {
    setAllTests(mapTests());
  }, []);

  const clearAllTestStatus = (index) => {
    const cloneTests = [...allTests];
    for (let i = 0; i < cloneTests[testNum].incorrect_answers.length; i++) {
      cloneTests[testNum].incorrect_answers[i].status = "";
    }
    setAllTests(cloneTests);
  };
  const selectAnswer = (index) => {
    clearAllTestStatus(index);
    setSelectedAnswer(index);
    const cloneTests = [...allTests];
    cloneTests[testNum].incorrect_answers[index].status = "selected";
    setAllTests(cloneTests);
  };
  const correctAnswer = () => {
    const cloneTests = [...allTests];
    cloneTests[testNum].incorrect_answers[selectedAnswerIndex].status =
      "correct";
    cloneTests[testNum].status = "correct";
    setAllTests(cloneTests);
  };
  const inCorrectAnswer = () => {
    const cloneTests = [...allTests];
    cloneTests[testNum].incorrect_answers[selectedAnswerIndex].status =
      "incorrect";
    cloneTests[testNum].status = "inCorrect";
    for (let i = 0; i < cloneTests[testNum].incorrect_answers.length; i++) {
      if (
        cloneTests[testNum].correct_answer ===
        cloneTests[testNum].incorrect_answers[i].text
      ) {
        cloneTests[testNum].incorrect_answers[i].status = "correct";
      }
    }
    setAllTests(cloneTests);
  };
  const checkTests = () => {
    if (
      allTests[testNum].correct_answer ===
      allTests[testNum].incorrect_answers[selectedAnswerIndex].text
    ) {
      correctAnswer();
    } else {
      inCorrectAnswer();
    }
    setSelectedAnswer("");
  };
  const next = () => {
    if (testNum !== allTests.length - 1) {
      setTestNum(testNum + 1);
    }
  };
  const previous = () => {
    if (testNum !== 0) {
      setTestNum(testNum - 1);
    }
  };
  const finish = () => {
    const cloneTests = [...allTests];
    const totalScore = allTests.length;
    const yourScore = allTests.filter((v) => v.status === "correct").length;
    const percent = Math.floor((yourScore * 100) / totalScore);
    setStatistcs({ percent, totalScore, yourScore });
    setModal(true);
    for (let i = 0; i < cloneTests.length; i++) {
      if (cloneTests[i].status !== "correct") {
        cloneTests[i].status = "inCorrect";
        for (let j = 0; j < cloneTests[i].incorrect_answers.length; j++) {
          if (
            cloneTests[i].correct_answer ===
            cloneTests[i].incorrect_answers[j].text
          ) {
            cloneTests[i].incorrect_answers[j].status = "correct";
          }
        }
      }
    }
    setAllTests(cloneTests);
  };
  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="container p-4 mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-9 mb-4">
          <div className="test__nums">
            {allTests.map((v, i) => (
              <Button
                key={i}
                onClick={() => {
                  setTestNum(i);
                  setSelectedAnswer("");
                }}
                className={`test__num ${v.status}  ${
                  testNum === i ? "active" : ""
                }`}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-9">
          <div className="quiz card ">
            <div className="quiz-head p-3 dark">
              <span className="fw-bold ">{testNum + 1}</span>.{" "}
              {tests[testNum].question}
            </div>
            <ul className="answers">
              {allTests?.[testNum]?.incorrect_answers.map((v, i) => (
                <li
                  className={v.status}
                  key={i}
                  onClick={() =>
                    allTests?.[testNum]?.status === "correct" ||
                    allTests?.[testNum]?.status === "inCorrect"
                      ? ""
                      : selectAnswer(i)
                  }
                >
                  {v.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="buttons d-flex justify-content-between mt-3">
            <Button
              variant='contained'
              className={`btn btn-primary ${0 === testNum ? "disabled" : ""}`}
              onClick={previous}
            >
              Previous
            </Button>
            <Button
              variant='contained'
              color='success'
              className={`btn btn-success   ${
                allTests[testNum]?.status === "correct" ||
                allTests[testNum]?.status === "inCorrect"
                  ? "disabled"
                  : ""
              } ${selectedAnswerIndex === "" ? "disabled" : ""} `}
              onClick={checkTests}
            >
              Submit
            </Button>
            <Button
              variant='contained'
              className={`${
                allTests.length - 1 === testNum ? "disabled" : ""
              }`}
              onClick={next}
            >
              Next
            </Button>
          </div>
          <Button variant='contained' className='finish-btn' onClick={finish}>
            Finish
          </Button>
        </div>
      </div>
      <div className={`my__modal ${modal ? "active" : ""}`}>
        <div className="modal__container">
          <h4>Your result</h4>
          <p>
            {statistcs.yourScore}/{statistcs.totalScore}
          </p>
          <p>or</p>
          <p>{statistcs.percent}%</p>
          <div className="d-flex">
            <Button
              variant="outlined w-50"
              className="bg-primary text-white"
              onClick={() => setModal(false)}
            >
              Ok
            </Button>
            <Button
              className="ms-3 w-50 bg-danger"
              variant="contained"
              onClick={goHome}
            >
              Go home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;