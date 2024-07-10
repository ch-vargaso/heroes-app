import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Explore the Heroes' Realm</h1>
      <div className="home-form">
        <Link Link className="button_primary" to={"/login"}>
          Login
        </Link>
        <Link Link className="button_primary" to={"/signup"} >
          Sign Up
        </Link>
        <p>or</p>
        <Link className="button_primary" to={"/feed"}>
          Enter as Guest
        </Link>
      </div>
    </div>
  );
}
export default Home;
