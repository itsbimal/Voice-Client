import React from "react";
import Card from "../card/Card";
import style from "./Loader.module.css";

const Loader = ({ message }) => {
  return (
    <div>
      <Card title="" icon="">
        <div className={style.message}>
          <div class={style.ldSpinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <span>{message}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Loader;
