import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-nav">
          <li className="item-footer">
            <Link to="/" className="footer-title">
              Gengar's Eats
            </Link>
          </li>
          <li
            className="email"
            onClick={() => (window.location = "mailto: scooterseoul@gmail.com")}
          >
            @Get in Touch
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
