import { useContext } from "react";
import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);
  const cardLikeButtonClass = `card__like-button ${
    !isLoggedIn
      ? "card__like-button_hidden"
      : isLiked
      ? "card__like-button_liked"
      : "card__like-button_not-liked"
  }`;

  const handleLike = () => {
    onCardLike({
      id: item._id,
      isLiked: isLiked,
    });
  };

  return (
    <div className="card">
      <img
        src={item.imageUrl}
        className="card__image"
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
      <p className="card__name">{item.name}</p>
      {isLoggedIn ? (
        <button
          type="button"
          className={cardLikeButtonClass}
          onClick={() => {
            handleLike();
          }}
        ></button>
      ) : (
        <button type="button" className="card__like-button_hidden"></button>
      )}
    </div>
  );
};

export default ItemCard;
