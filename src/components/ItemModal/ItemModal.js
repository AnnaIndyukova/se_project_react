import { useEffect, useRef, useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, onDelete }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__item_delete-button ${
    isOwn
      ? "modal__item_delete-button_visible"
      : "modal__item_delete-button_hidden"
  }`;
  return (
    <div className={"modal"}>
      <div className="modal__content-item">
        <button
          className="modal__close-button-item"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__item-image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__item-info">
          <div className="modal__item-info-del-button">
            {selectedCard.name}

            <button
              className={itemDeleteButtonClassName}
              type="text"
              onClick={onDelete}
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather-type">
            Weather type: {selectedCard.weather}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
