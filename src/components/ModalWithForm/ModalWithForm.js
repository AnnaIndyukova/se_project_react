import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  name,
}) => {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <p className="modal__title">{title}</p>
        {children}
        <button className="modal__submit-button" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ModalWithForm;
