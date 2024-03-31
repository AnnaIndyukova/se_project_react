import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ cards, onSelectCard, onCreateModal }) => {
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
        {cards.map((item) => (
          <ItemCard item={item} onSelectCard={onSelectCard} key={item._id} />
        ))}
      </div>
    </section>
  );
};
export default ClothesSection;
