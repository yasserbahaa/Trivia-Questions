import "./App.css";

import Question from "./Components/Question";
import React, { useState, useEffect } from "react";
import Footer from "./Components/Footer";
import { nanoid } from "nanoid";
import Dropdown from "./Components/Dropdown.js";
//s
function App() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [numberOfCorrect, setNumberOfCorrect] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [dataReady, setDataReady] = useState(false);
  // Get and setting data
  useEffect(() => {
    async function fetchData() {
      setDataReady(false);
      const res = await fetch(
        `https://opentdb.com/api.php?amount=50&${
          (getDifficulty(), getCategory())
        }type=multiple`
      );
      const data = await res.json();
      setAllQuestions(data.results.slice(5));

      setQuestions(() =>
        data.results.slice(0, 5).map((elem) => {
          return {
            id: nanoid(),
            question: elem.question,
            correctAnswer: elem.correct_answer,
            incorrectAnswers: elem.incorrect_answers,
            userAnswer: false,
          };
        })
      );
      setDataReady(true);
    }
    fetchData();
  }, [refreshData, difficulty, category]);

  useEffect(() => {
    if (started) return;

    setQuestions(() =>
      allQuestions.slice(0, 5).map((elem) => {
        return {
          id: nanoid(),
          question: elem.question,
          correctAnswer: elem.correct_answer,
          incorrectAnswers: elem.incorrect_answers,
          userAnswer: false,
        };
      })
    );
    setAllQuestions((prev) => prev.slice(5));
    if (allQuestions.length < 10) setRefreshData((prev) => !prev);
  }, [started]);

  // setting number of correct answers of user
  useEffect(() => {
    setNumberOfCorrect(() => {
      let res = 0;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].userAnswer) res += 1;
      }

      return res;
    });
  }, [questions]);

  const elements = questions.map((elem) => {
    return (
      <Question
        key={elem.id}
        id={elem.id}
        question={elem.question}
        correctAnswer={elem.correctAnswer}
        incorrectAnswers={elem.incorrectAnswers}
        finished={finished}
        reset={Reset}
        registerAnswer={(bool) => RegisterAnswer(elem.id, bool)}
      />
    );
  });

  function Reset() {
    setStarted(false);
    setFinished(false);
    setNumberOfCorrect(0);
  }

  function RegisterAnswer(id, bool) {
    setQuestions(() =>
      questions.map((elem) => {
        return elem.id === id ? { ...elem, userAnswer: bool } : elem;
      })
    );
  }

  function getDifficulty() {
    if (difficulty === "Easy") return "difficulty=easy&";
    else if (difficulty === "Medium") return "difficulty=medium&";
    else if (difficulty === "Hard") return "difficulty=hard&";
    else return "";
  }

  function getCategory() {
    switch (category) {
      case "Any":
        return "";
      case "General Knowledge":
        return "category=9&";
      case "Science & Nature":
        return "category=17&";
      case "Sports":
        return "category=21&";
      case "Celebrities":
        return "category=26&";
      case "Animals":
        return "category=27&";
      case "Vehicles":
        return "category=28&";
      case "Art":
        return "category=25&";
      case "Music":
        return "category=12&";
      case "Film":
        return "category=11&";

      default:
        break;
    }
  }

  return (
    <main>
      {!started ? (
        // <StartPage
        //   handleClick={() => setStarted(true)}
        //   setDifficulty={setDifficulty}
        // />

        <div className="startPage">
          <h1 className="startTitle">Quzzical</h1>
          <p className="startDescription">A fun trivia experience!</p>
          <div className="dropdown--container">
            <Dropdown
              className="dropdown"
              variable="Difficulty"
              values={["Any", "Easy", "Medium", "Hard"]}
              setVariable={(value) => setDifficulty(value)}
            />

            <Dropdown
              variable="Category"
              values={[
                "Any",
                "General Knowledge",
                "Science & Nature",
                "Sports",
                "Celebrities",
                "Animals",
                "Vehicles",
                "Art",
                "Music",
                "Film",
              ]}
              setVariable={(value) => setCategory(value)}
            />
          </div>

          <button
            onClick={() => setStarted(true)}
            className="blue--button"
            disabled={!dataReady}
          >
            Start quiz
          </button>
        </div>
      ) : (
        <div>
          {elements}

          <Footer
            setFinish={() => setFinished(true)}
            finished={finished}
            reset={Reset}
            numberOfCorrect={numberOfCorrect}
          />
        </div>
      )}
    </main>
  );
}

export default App;
