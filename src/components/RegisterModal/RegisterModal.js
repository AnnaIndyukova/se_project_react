import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ onRegister, onCloseModal, isOpen, buttonText }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Sign Up"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      buttonText={buttonText}
    >
      <div className="modal__form-inputs">
        <label className="modal__form-label">
          Email *{" "}
          <input
            className="modal__form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className="modal__form-label">
          Password *{" "}
          <input
            className="modal__form-input"
            type="password"
            minLength="8"
            maxLength="30"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label className="modal__form-label">
          Name *{" "}
          <input
            className="modal__form-input"
            type="text"
            minLength="1"
            maxLength="30"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__form-label">
          Avatar URL *{" "}
          <input
            className="modal__form-input"
            type="url"
            name="avatar"
            minLength="1"
            placeholder="Avatar URL"
            value={avatar}
            onChange={handleAvatarUrlChange}
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
