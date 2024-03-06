import { latitude, longitude, APIKey } from "../utils/constants";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && Math.ceil(main.temp);
  const city = data.name;
  let type = "";
  if (temperature >= 86) {
    type = "hot";
  } else if (temperature >= 66 && temperature <= 85) {
    type = "warm";
  } else if (temperature <= 65) {
    type = "cold";
  }
  return { temperature, city, type };
};
