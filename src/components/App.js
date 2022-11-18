import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import * as Auth from '../utils/Auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentCardDelete, setCurrentCardDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltiopen, setIsInfoTooltiOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [registed, setRegisted] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
    setIsImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltiOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(err => console.log(`Изменения лайка не произошло! ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteNewCard(card._id).then(() => {
      setCards(cards.filter((prevCard) => prevCard._id !== card._id));
      setCurrentCardDelete(card);
    })
      .catch(err => console.log(`Не получилось удалить карточку. ${err}`))
  }

  function handleSubmit(data) {
    api.patchInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Данные о ползователе не отправляються. ${err}`))
  }

  function handleUpdateAvatar(data) {
    api.patchAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Аватар не отпровляесться. ${err}`))
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then(res => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Данные новой карточки не отправляютьсяю. ${err}`))
  }

  useEffect(() => {
    if (loggedIn) {
      api.getInfo()
        .then(res => {
          setCurrentUser(res)
        })
        .catch(err => console.log(`Возникла ошибка ${err}`))

      api.getInitialCards()
        .then(response => {
          setCards(response)
        })
        .catch(err => console.log(`Возникла ошибка ${err}`))
    }
  }, [loggedIn])

  // авторизация  
  const getToken = useCallback(async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        console.log("Ошибка с токеном");
      }
      const user = await Auth.getContent(jwt);
      if (!user) {
        throw new Error("Беда с юзером");
      }
      setLoggedIn(true);
      setUserEmail(user.data.email);
    } catch {
      console.log("400 — Токен не передан или передан не в том формате или 401 — Переданный токен некорректен");
    }
  }, []);

  useEffect(() => {
    getToken()
  }, []);

  const handleRegister = useCallback(async ({ email, password }) => {
    try {
      const res = await Auth.registration({ email, password })
      if (res) {
        setIsInfoTooltiOpen(true);
        setRegisted(true);
        return res;
      }
    } catch (error) {
      console.log(`400 - некорректно заполнено одно из полей ${error}`);
      setIsInfoTooltiOpen(true);
    }
  }, []);

  const handleLogin = useCallback(async (email, password) => {
    try {
      const data = await Auth.authorize(email, password);
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setUserEmail(email)
      }
    } catch (err) {
      switch (err) {
        case 400:
          console.log("Ошибка 400. Не передано одно из полей.");
          break;
        case 401:
          console.log(`Ошибка 401. Пользователь ${email} не найден.`);
          break;
        default:
          console.log(`Аутентификация не пройдена. Ошибка ${err}`);
      }
    }
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserEmail('');
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header logout={logout} email={userEmail} />
        <Switch>
          <ProtectedRoute path="/" exact
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onClickCard={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn} />

          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin}
            loggedIn={loggedIn}
            />
          </Route>
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleSubmit} />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <InfoTooltip
          isOpen={isInfoTooltiopen}
          onClose={closeAllPopups}
          registed={registed} />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />

        <Footer />

      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;