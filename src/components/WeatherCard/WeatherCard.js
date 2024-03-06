import "./WeatherCard.css";

const weatherOptions = [
  {
    url: require("../../images/day/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/day/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/night/moon.svg").default,
    day: false,
    type: "moon",
  },
  {
    url: require("../../images/night/cloudy.svg").default,
    day: false,
    type: "cloudy",
  },
];

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherOptions.filter((i) => {
    return i.day === day && i.type === type;
  });
  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">{weatherTemp}°F</div>
      <img src={imageSrcUrl} className="weather__image" alt="weather" />
    </section>
  );
};
export default WeatherCard;
