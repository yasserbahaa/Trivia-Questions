import React, { useState } from "react";

export default function (props) {
  const [checkAnswers, setCheckAnswers] = useState(true);

  return (
    <div className="footer">
      {
        /*props.correctAnswers.length >= 5 && */ checkAnswers && (
          <button
            className="blue--button"
            onClick={() => {
              setCheckAnswers(false);
              props.setFinish();
            }}
          >
            Check Answers
          </button>
        )
      }

      {props.finished && (
        <div className="results--container">
          <p className="results--text">
            You scored {props.numberOfCorrect}/5 correct answers
          </p>
          <button
            className="blue--button"
            onClick={() => {
              setCheckAnswers(true);
              props.reset();
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
