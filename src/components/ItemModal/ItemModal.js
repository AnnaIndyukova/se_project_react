import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
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
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="modal__item-info">
          <div>{selectedCard.name}</div>
          <div className="modal__weather-type">
            Weather type: {selectedCard.weather}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;