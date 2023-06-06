import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import logo from "../logo.png";

const SideBar = () => {
  return (
    <div className="sideBarCont">
      <div className="logoside">
        <img src={logo} alt="logo" className="sideLogo" />
      </div>
      <div className="navMenu">
        <ul className="nav1">
          <li className="item-eats">
            <Link to="/" className="nav-link">
              Eats
            </Link>
          </li>
          <li className="item-reservations">
            <Link to="/reservations" className="nav-link">
              Reservations
            </Link>
          </li>
          <li className="user-login">
            <LoginButton />
          </li>
          <li
            className="contactUs"
            onClick={() => (window.location = "mailto: scooterseoul@gmail.com")}
          >
            Contact
          </li>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
