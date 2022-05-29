import React from "react";
import style from "./Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/common/card/Card";
import Button from "../../components/common/buttons/Button";

const Home = () => {
  const signIn = {
    color: "aliceblue",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  // for button clicked navigate
  let navigate = useNavigate();
  const handleClick = e =>{
    e.preventDefault();
    navigate('/authenticate')
  }

  return (
    <div className={style.cardBody}>
      <Card title="Welcome to Voice!" icon="logo">
        <p className={style.pText}>
          Create room to raise voice. Give your thought to mass people in a
          single click. Increase your popularity, gain quick attention and just
          share your fucking Ideas!
        </p>
        <div>
          <Button onClick={handleClick} text={"Let's get started "} />
        </div>
        <div className={style.login}>
          <span>Already a member?</span>
          <Link style={signIn} to={"/login"}>
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
