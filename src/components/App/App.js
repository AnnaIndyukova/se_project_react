import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { useState, useEffect } from "react";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [type, setType] = useState("");
  const [city, setCity] = useState("");

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

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const parsedWeatherData = parseWeatherData(data);
        setTemp(parsedWeatherData.temperature);
        setType(parsedWeatherData.type);
        setCity(parsedWeatherData.city);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        <Header city={city} onCreateModal={handleCreateModal} />
        <Main
          weatherTemp={temp}
          weatherType={type}
          onSelectCard={handleSelectedCard}
        />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm onClose={handleCloseModal} title="New Garment">
            <div className="modal__form-inputs">
              <label className="modal__form-label">
                Name{" "}
                <input
                  className="modal__form-input"
                  type="text"
                  name="name"
                  minLength="1"
                  maxLength="30"
                  placeholder="Name"
                />
              </label>
              <label className="modal__form-label">
                Image{" "}
                <input
                  className="modal__form-input"
                  type="url"
                  name="link"
                  minLength="1"
                  maxLength="30"
                  placeholder="Image URL"
                />
              </label>
            </div>
            <p className="modal__form-radio-header">Select the weather type:</p>
            <div className="modal__radio">
              <div>
                <label>
                  <input
                    type="radio"
                    id="hot"
                    value="hot"
                    name="weatherType"
                    className="modal__radio-input"
                  />
                  <span> Hot</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    id="warm"
                    value="warm"
                    name="weatherType"
                    className="modal__radio-input"
                  />
                  <span> Warm</span>
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    id="cold"
                    value="cold"
                    name="weatherType"
                    className="modal__radio-input"
                  />
                  <span> Cold</span>
                </label>
              </div>
            </div>
          </ModalWithForm>
        )}

        {activeModal === "preview" && (
          <ItemModal onClose={handleCloseModal} selectedCard={selectedCard} />
        )}
      </div>
    </div>
  );
}

export default App;
