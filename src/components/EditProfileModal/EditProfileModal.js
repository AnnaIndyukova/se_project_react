import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  onSaveProfileChanges,
  onCloseModal,
  isOpen,
  buttonText,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState(currentUser.avatar);
  const handleAvatarUrlChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfileChanges({ name, avatar });
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="Change profile data"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      buttonText={buttonText}
    >
      <div className="modal__form-inputs">
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
          Avatar *{" "}
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

export default EditProfileModal;
