import { useState } from "react";
import { useContext } from "react";
import "./Header.css";
import logoSrc from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal, onRegister, onLogin, city, isLoggedIn }) => {
  const dateToday = new Date();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={logoSrc} alt="logo" />
          </Link>
        </div>
        <div className="header__date">
          {dateToday.toLocaleString("default", {
            month: "long",
            day: "numeric",
          })}
          , {city}
        </div>
      </div>

      <div className="header__avatar">
        <ToggleSwitch value={checked} onChange={handleChange} />
        {isLoggedIn ? (
          <>
            <div>
              <button
                className="header__button"
                type="text"
                onClick={onCreateModal}
              >
                + Add clothes
              </button>
            </div>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <p className="header__name">{currentUser.name}</p>
            </Link>
            <img
              className="header__avatar-img"
              src={currentUser.avatar}
              alt="user avatar"
            ></img>
          </>
        ) : (
          <>
            <button className="header__button" type="text" onClick={onRegister}>
              Sign Up
            </button>
            <button className="header__button" type="text" onClick={onLogin}>
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
