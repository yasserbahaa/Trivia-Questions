import Dropdown from "./Dropdown.js";

export default function (props) {
  return (
    <div className="startPage">
      <h1 className="startTitle">Quzzical</h1>
      <p className="startDescription">A fun trivia experience!</p>
      <Dropdown
        variable="Difficulty"
        values={["Easy", "Medium", "Hard"]}
        setVariable={props.setDifficulty}
      />

      <button onClick={props.handleClick} className="blue--button">
        Start quiz
      </button>
    </div>
  );
}
