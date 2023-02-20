import "./Header.css";
import { Link } from "react-router-dom";
import Logo from "../logo.png";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          <img src={Logo} alt="" className="logo" />
        </Link>
        <ul className="nav">
          <li className="item-rest">
            <Link to="/" className="nav-link">
              Eats
            </Link>
          </li>
          <li className="item-rez">
            <Link to="/reservations" className="nav-link">
              Reservations
            </Link>
          </li>
          <li className="nav-item3">
            <LoginButton />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
