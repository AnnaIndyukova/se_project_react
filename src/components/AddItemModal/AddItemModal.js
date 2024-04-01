import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onAddItem, onCloseModal, isOpen, buttonText }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherType = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      onClose={onCloseModal}
      title="New Garment"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      buttonText={buttonText}
    >
      <div className="modal__form-inputs">
        <label className="modal__form-label">
          Name{" "}
          <input
            className="modal__form-input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__form-label">
          Image{" "}
          <input
            className="modal__form-input"
            type="url"
            name="link"
            minLength="1"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleUrlChange}
          />
        </label>
      </div>
      <p className="modal__form-radio-header">Select the weather type:</p>
      <div className="modal__radio">
        <div>
          <label>
            <input
              type="radio"
              id="hot"
              value="hot"
              name="weatherType"
              className="modal__radio-input"
              onChange={handleWeatherType}
            />
            <span> Hot</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="warm"
              value="warm"
              name="weatherType"
              className="modal__radio-input"
              onChange={handleWeatherType}
            />
            <span> Warm</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              id="cold"
              value="cold"
              name="weatherType"
              className="modal__radio-input"
              onChange={handleWeatherType}
            />
            <span> Cold</span>
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
