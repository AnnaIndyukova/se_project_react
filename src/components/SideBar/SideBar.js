import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

const SideBar = ({ onEditProfileModal, onLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="sideBar">
      <div className="sideBar__avatar-name">
        <img
          className="sideBar__avatar-img"
          src={currentUser.avatar}
          alt="user avatar"
        ></img>
        <h3 className="sideBar__name">{currentUser.name}</h3>
      </div>

      <button
        onClick={onEditProfileModal}
        type="button"
        className="sidebar__button sidebar__button-change"
      >
        Change profile data
      </button>
      <button
        onClick={onLogout}
        type="button"
        className="sidebar__button sidebar__button-logout"
      >
        Log out
      </button>
    </div>
  );
};
export default SideBar;
