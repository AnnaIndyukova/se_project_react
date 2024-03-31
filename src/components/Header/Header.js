import { useState } from "react";
import "./Header.css";
import logoSrc from "../../images/logo.svg";
import avatarSrc from "../../images/userAvatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({ onCreateModal, city }) => {
  const dateToday = new Date();
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
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
          <p className="header__name">Terrence Tegegne</p>
        </Link>
        <div className="header__avatar-img">
          <img src={avatarSrc} alt="user avatar"></img>
        </div>
      </div>
    </header>
  );
};
export default Header;
