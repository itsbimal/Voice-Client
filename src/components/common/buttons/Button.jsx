import React from "react";
import style from "./Button.module.css";

const Button = ({ text, onClick }) => {
  const arrow = {
    marginLeft: "10px",
  };

  return (
    <button onClick={onClick} className={style.button}>
      <span>{text}</span>
      <i className="fa-solid fa-circle-arrow-right" style={arrow}></i>
    </button>
  );
};

export default Button;
