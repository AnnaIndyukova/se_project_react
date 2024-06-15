import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { useState, useEffect } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Switch, Route } from "react-router-dom";
import api from "../../utils/api";
import auth from "../../utils/auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const openCreateModal = () => {
    setActiveModal("create");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };
  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openEditProfileModal = () => {
    setActiveModal("editProfile");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch(console.error);
    }
  }, []);

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
    setIsLoading(true);
    api
      .addItem(item)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegisterSubmit = ({ name, avatar, email, password }) => {
    const userData = { name, avatar, email, password };
    setIsLoading(true);
    auth
      .register(userData)
      .then((res) => {
        handleLoginSubmit({ email, password });
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginSubmit = ({ email, password }) => {
    const userData = { email, password };
    setIsLoading(true);
    auth
      .login(userData)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          auth.checkToken(res.token).then((data) => {
            setIsLoggedIn(true);
            setCurrentUser(data);
            handleCloseModal();
          });
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangeProfileSubmit = ({ name, avatar }) => {
    const userData = { name, avatar };
    setIsLoading(true);
    auth
      .updateUser(userData)
      .then((res) => {
        setCurrentUser(res.data);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = () => {
    api
      .deleteItem(selectedCard._id)
      .then(() => {
        const newItemList = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newItemList);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    isLiked
      ? api
          .removeCardLike(id)
          .then((updatedCard) => {
            setClothingItems((clothingItems) => {
              return clothingItems.map((c) => (c._id === id ? updatedCard : c));
            });
          })
          .catch(console.error)
      : api
          .addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((clothingItems) => {
              return clothingItems.map((c) => (c._id === id ? updatedCard : c));
            });
          })
          .catch(console.error);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({});
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const parsedWeatherData = parseWeatherData(data);
        setTemp(parsedWeatherData.weather);
        setType(parsedWeatherData.type);
        setCity(parsedWeatherData.city);
      })
      .catch(console.error);
    api
      .getItemsList()
      .then((res) => {
        setClothingItems(res);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={{ currentUser }}>
          <div className="page__wrapper">
            <Header
              weatherTemp={temp}
              city={city}
              onCreateModal={openCreateModal}
              onRegister={openRegisterModal}
              onLogin={openLoginModal}
              isLoggedIn={isLoggedIn}
            />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  weatherType={type}
                  onSelectCard={handleSelectedCard}
                  onCardLike={handleCardLike}
                  cards={clothingItems}
                  isLoggedIn={isLoggedIn}
                />
              </Route>

              <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile
                  cards={clothingItems}
                  onSelectCard={handleSelectedCard}
                  onCreateModal={openCreateModal}
                  onEditProfileModal={openEditProfileModal}
                  onCardLike={handleCardLike}
                  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
              </ProtectedRoute>
            </Switch>
            <Footer />

            {activeModal === "create" && (
              <AddItemModal
                onAddItem={handleAddItemSubmit}
                onCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                buttonText={isLoading ? "Saving..." : "Add garment"}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                onClose={handleCloseModal}
                selectedCard={selectedCard}
                onDelete={handleDeleteItem}
              />
            )}
            {activeModal === "register" && (
              <RegisterModal
                onRegister={handleRegisterSubmit}
                onCloseModal={handleCloseModal}
                isOpen={activeModal === "register"}
                buttonText={isLoading ? "Registering..." : "Sign Up"}
              />
            )}
            {activeModal === "login" && (
              <LoginModal
                onLogin={handleLoginSubmit}
                onCloseModal={handleCloseModal}
                isOpen={activeModal === "logIn"}
                buttonText={isLoading ? "Checking..." : "Log In"}
              />
            )}
            {activeModal === "editProfile" && (
              <EditProfileModal
                onSaveProfileChanges={handleChangeProfileSubmit}
                onCloseModal={handleCloseModal}
                isOpen={activeModal === "editProfile"}
                buttonText={isLoading ? "Saving..." : "Save changes"}
              />
            )}
          </div>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
