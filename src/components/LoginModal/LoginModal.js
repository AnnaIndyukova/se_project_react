import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ onLogin, onCloseModal, isOpen, buttonText }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Log in"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      buttonText={buttonText}
    >
      <div className="modal__form-inputs">
        <label className="modal__form-label">
          Email{" "}
          <input
            className="modal__form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <label className="modal__form-label">
          Password{" "}
          <input
            className="modal__form-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
