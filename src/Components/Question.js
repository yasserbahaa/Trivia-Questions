import React, { useState, useEffect } from "react";
import AnswerButton from "./AnswerButton";
import { nanoid } from "nanoid";

export default function (props) {
  const [answersButtons, setAnswersButtons] = useState(createAnswers());

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    for (let i = 0; i < answersButtons.length; i++) {
      if (answersButtons[i].clicked) {
        props.registerAnswer(answersButtons[i].isCorrect);
      }
    }
  }, [answersButtons]);

  function createAnswers() {
    let answersButtons = props.incorrectAnswers.map((elem) => {
      return {
        id: nanoid(),
        answer: elem,
        isCorrect: false,
        clicked: false,
      };
    });
    answersButtons.push({
      id: nanoid(),
      answer: props.correctAnswer,
      isCorrect: true,
      clicked: false,
    });
    return shuffleArray(answersButtons);
  }

  function ToggleClick(id) {
    if (props.finished) return;

    setAnswersButtons((prev) =>
      prev.map((elem) => {
        return elem.id === id
          ? { ...elem, clicked: true }
          : { ...elem, clicked: false };
      })
    );
  }
  const answerElements = answersButtons.map((elem) => (
    <AnswerButton
      key={elem.id}
      answer={elem.answer}
      isCorrect={elem.isCorrect}
      clicked={elem.clicked}
      finished={props.finished}
      toggleClick={() => ToggleClick(elem.id)}
    />
  ));

  return (
    <div>
      <h2
        className="question"
        dangerouslySetInnerHTML={{ __html: props.question }}
      ></h2>
      <div className="answers--container">{answerElements}</div>
      <hr />
    </div>
  );
}
