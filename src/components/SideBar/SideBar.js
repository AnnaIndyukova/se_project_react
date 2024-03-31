import "./SideBar.css";
import avatarSrc from "../../images/userAvatar.svg";

const SideBar = () => {
  return (
    <div className="sideBar">
      <img
        className="sideBar__avatar-img"
        src={avatarSrc}
        alt="user avatar"
      ></img>
      <p className="sideBar__name">Terrence Tegegne</p>
    </div>
  );
};
export default SideBar;
