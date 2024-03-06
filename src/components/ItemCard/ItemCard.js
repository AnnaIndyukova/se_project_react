import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard, itemID }) => {
  return (
    <div>
      <div className="card">
        <img
          src={item.link}
          className="card__image"
          alt={item.name}
          onClick={() => onSelectCard(item)}
        />
        <div className="card__name">{item.name}</div>
      </div>
    </div>
  );
};

export default ItemCard;
