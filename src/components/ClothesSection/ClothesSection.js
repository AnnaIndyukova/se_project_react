import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  cards,
  onSelectCard,
  onCreateModal,
  onCardLike,
  isLoggedIn,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const filteredItems = cards?.filter((card) => {
    return card.owner === currentUser._id;
  });
  return (
    <section className="clothesSection__section" id="clothesSection-section">
      <div className="clothesSection__caption">
        <p className="clothesSection__title">Your items</p>
        <button
          className="clothesSection__button"
          type="text"
          onClick={onCreateModal}
        >
          + Add new
        </button>
      </div>

      <div className="clothesSection__items">
        {filteredItems.map((item) => (
          <ItemCard
            item={item}
            onSelectCard={onSelectCard}
            onCardLike={onCardLike}
            key={item._id}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
};
export default ClothesSection;
