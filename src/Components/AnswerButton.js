import React, { useState, useEffect } from "react";

export default function (props) {
  const style = () => {
    if (!props.finished && props.clicked) return { backgroundColor: "#D6DBF5" };
    else if (props.finished && props.clicked && props.isCorrect)
      return { backgroundColor: "#94D7A2" };
    else if (props.finished && props.clicked && !props.isCorrect)
      return { backgroundColor: "#F8BCBC" };
  };

  return (
    <button
      className="answer--button"
      onClick={props.toggleClick}
      style={style()}
      dangerouslySetInnerHTML={{ __html: props.answer }}
    >
      {/* {props.answer} */}
    </button>
  );
}
