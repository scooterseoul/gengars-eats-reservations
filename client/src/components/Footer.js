import "./Footer.css";
import { Link } from "react-router-dom";
import Github from "../icons8-github-96.png";
import Linkdin from "../icons8-linkedin-100.png";

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
          <li className="thanksCont">
            <p className="thanks">
              Thanks for visiting.
              <br /> This site was created by C. Alexander.
            </p>
            <a href="https://github.com/scooterseoul" target="_blank">
              <img src={Github} className="ghicon" alt="github"></img>
            </a>
            <a
              href="https://www.linkedin.com/in/claudette-alexander"
              target="_blank"
            >
              <img src={Linkdin} className="linkdinIcon" alt="linkdin"></img>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
