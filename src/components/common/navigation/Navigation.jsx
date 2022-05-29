import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../http/Index";
import { setAuth } from "../../../store/AllSlice";
import style from "./Navigation.module.css";
import { useNavigate } from "react-router-dom";


const Navigation = () => {
    // JS Inline css
  const logoStyle = {
      color:'#fff',
      textDecoration:'none',
      fontWeight:'bolder',
      fontSize:'45px',
      display:'flex',
      alignItems:'center'
  };

  const logoText = {
      marginLeft:'10px',
  }

  const dispatch = useDispatch();
  async function logoutUser(){
      try {
        const {data} = await logout();
        dispatch(setAuth(data));

      } catch (error) {
        console.log(error);
      }
  }

  const {isAuth, user} = useSelector((state) => state.Auth)

  return (
    <nav className={`container ${style.navbar}`}>
      <Link style={logoStyle} to={"/"}>
        <img cla src="/images/logo.png" alt="Logo" />
        <span style={logoText}>VoiCE</span>
      </Link>
      <div className={style.navRight}>
        {user && <h3 className="display-6 fw-bolder">{user.name}</h3>}
        <Link to={"/profile"}>
          {user && <img className={style.profile} src={user.profile}  alt="Profile" />}
        </Link>
        {isAuth && <button className={style.logout} onClick={logoutUser}><i class="fa-solid fa-right-from-bracket text-secondary"></i></button>}

      </div>
    </nav>
  );
};

export default Navigation;
