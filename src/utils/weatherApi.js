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
  const temperatureF = main && Math.round(main.temp);

  const weather = {
    temperature: {
      F: temperatureF,
      C: Math.round(((temperatureF - 32) * 5) / 9),
    },
  };

  const city = data.name;
  let type = "";
  if (temperatureF >= 86) {
    type = "hot";
  } else if (temperatureF >= 66 && temperatureF <= 85) {
    type = "warm";
  } else if (temperatureF <= 65) {
    type = "cold";
  }
  return { weather, city, type };
};
