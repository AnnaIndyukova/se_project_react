import "./Header.css";
import logoSrc from "../../images/logo.svg";
import avatarSrc from "../../images/userAvatar.svg";

const Header = ({ onCreateModal, city }) => {
  const dateToday = new Date();
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logoSrc} alt="logo" />
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
        <div>
          <button
            className="header__button"
            type="text"
            onClick={onCreateModal}
          >
            + Add clothes
          </button>
        </div>
        <div className="header__name">Terrence Tegegne</div>
        <div className="header__avatar-img">
          <img src={avatarSrc} alt="user avatar"></img>
        </div>
      </div>
    </header>
  );
};
export default Header;
