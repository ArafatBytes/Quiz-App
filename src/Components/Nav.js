import { Link } from "react-router-dom";
import classes from "../Styles/Nav.module.css";
import logo from "../assets/images/brain.png";
import Account from "./Account";

export default function Nav() {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to="/" className={classes.brand}>
            <img src={logo} alt="Brain Logo" />
            <h3>Test your brain</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
}
