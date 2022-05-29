import "./App.css";
import Home from "./pages/home/Home";
import Rooms from "./pages/rooms/Rooms";
import Activate from "./pages/activate/Activate";
import Authenticate from "./pages/authenticate/Authenticate";
import Navigation from "./components/common/navigation/Navigation";
import { useSelector } from "react-redux";
import Loader from "./components/common/loader/Loader";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import React, { useState } from "react";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Room from "./pages/room/Room";
import Profile from "./pages/profile/Profile";

const isAuth= true;
const user = {
  activated: false,
}

function App() {
  // Calling refresh endpoint
  const {loading} =  useLoadingWithRefresh();

  return loading ? (
    <Loader message="Processing" />
  ) : (
    <Router>
      <Navigation />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>

        <Route element={<SemiProtected />}>
          <Route path="/activate" element={<Activate />} />
        </Route>

        <Route element={<Protected />}>
          <Route path="/room" element={<Rooms />} />
          <Route path="/room/:id" element={<Room/>}/>
          <Route path="/profile" element={<Profile/>} />
        </Route>

      </Routes>
    </Router>
  );
}

// for protected routes, dummy
// const useAuth = () =>{
//   const user = {loggedIn: false};
//   return user && user.loggedIn;
// };

const GuestRoute = () => {
  // const { isAuth } = useSelector((state) => state.Auth);
  // const isAuth = useAuth();
  return isAuth ? 
  <Navigate to={"/room"} /> 
  : 
  <Outlet />;
};

const SemiProtected = () => {
  // const { user, isAuth } = useSelector((state) => state.Auth);
  // const isAuth = useAuth();
  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !user.activated ? (
    <Outlet />
  ) : (
    <Navigate to={"/room"} />
  );
};

const Protected = () => {
  // const { user, isAuth } = useSelector((state) => state.Auth);
  // const isAuth = useAuth();
  return !isAuth ? (
    <Navigate to={"/"} />
  ) : isAuth && !user.activated ? (
    <Navigate to={"/activate"} />
  ) : (
    <Outlet />
  );
};

export default App;

// redirect = Navigate
