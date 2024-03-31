import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { useState, useEffect } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Switch, Route } from "react-router-dom";
import { addItem, deleteItem, getItemsList } from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const item = { name, imageUrl, weather };
    addItem(item)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteItem = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        const newItemList = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const parsedWeatherData = parseWeatherData(data);
        setTemp(parsedWeatherData.weather);
        setType(parsedWeatherData.type);
        setCity(parsedWeatherData.city);
      })
      .catch((err) => {
        console.log(err);
      });
    getItemsList()
      .then((res) => {
        setClothingItems(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__wrapper">
          <Header
            weatherTemp={temp}
            city={city}
            onCreateModal={handleCreateModal}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                weatherType={type}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            </Route>
            <Route path="/profile">
              <Profile
                cards={clothingItems}
                onSelectCard={handleSelectedCard}
                handleCreateModal={handleCreateModal}
              />
            </Route>
          </Switch>
          <Footer />
          {activeModal === "create" && (
            <AddItemModal
              onAddItem={handleAddItemSubmit}
              onCloseModal={handleCloseModal}
              isOpen={activeModal === "create"}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              onClose={handleCloseModal}
              selectedCard={selectedCard}
              onDelete={handleDeleteItem}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
