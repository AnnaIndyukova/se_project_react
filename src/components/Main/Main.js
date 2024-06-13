import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  weatherTemp,
  weatherType,
  onSelectCard,
  onCardLike,
  cards,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentUser } = useContext(CurrentUserContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 80;
  const filteredCards = cards.filter((item) => {
    return (
      item.weather.toLowerCase() === weatherType &&
      (isLoggedIn ? item.owner === currentUser._id : true)
    );
  });

  return (
    <main className="main">
      <WeatherCard day={true} type="cloudy" weatherTemp={temp} />
      <section className="card__section" id="card-section">
        Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        <div className="card__items">
          {filteredCards.map((item) => (
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
    </main>
  );
}

export default Main;
