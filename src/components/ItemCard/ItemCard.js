import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard, itemID }) => {
  return (
    <div className="card">
      <img
        src={item.link}
        className="card__image"
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
      <p className="card__name">{item.name}</p>
    </div>
  );
};

export default ItemCard;
