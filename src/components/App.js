import React from 'react';
import { useState } from "react";
import api from '../utils/api';
import '../index.css';

import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

import CurrentUserContext from '../contexts/CurrentUserContext'


function App() {

  //создание стейтов:
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //карточки
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  //данные пользователя
  const [currentUser, setCurrentUser] = useState({});
  

  //получение данных о пользователе
  React.useEffect(() => {
    api.getUserInformation()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((error) => {
        console.log('Ошибка получения данных', error);
      });
  }, []);

    //загрузка данных карточек
    React.useEffect(() => {
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((error) => {
          console.log('Ошибка получения данных карточки', error);
        });
  }, []);

    //лайк
    function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        console.log(card.likes)
      })
      .catch((error) => {
        console.log('Ошибка лайка', error);
      });
    }

    //удаление карточки
    function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      })
      .catch((error) => {
        console.log('Ошибка лайка', error);
      });
    }

    //обновление данных о пользователе
    function handleUpdateUser(data) {
      api.editUserInformation(data)
        .then((dataUser) => {
          setCurrentUser(dataUser);
          closeAllPopups();
        })
        .catch((error) => {
          console.log('Ошибка обновления данных о пользователе', error);
        });
    }

    //обновление аватара пользователя
    function handleUpdateAvatar(data) {
      api.changeAvatar(data)
        .then((dataAvatar) => {
          setCurrentUser(dataAvatar);
          closeAllPopups();
        })
        .catch((error) => {
          console.log('Ошибка обновления аватара', error);
        });
    }


  //открытие окна редактироования аватар
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //открытие окна редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //открытие окна дабавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //открытие окна просмотра карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //закрытие всех модальных окон
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({})
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm 
            name='add-card' 
            title='Новое место' 
            buttonName='Создать' 
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          > 
              <input
                className="popup__input popup__input_type_place"
                id="name"
                type="text"
                placeholder="Название"
                name="name"
                required
              />
              <span id="name-error" className="error"></span>
              <input
                className="popup__input popup__input_type_link"
                id="link"
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                required
              />
              <span id="link-error" className="error"></span>
          </PopupWithForm>

          <PopupWithForm 
            name='confirm' 
            title='Вы уверены' 
            buttonName='Да'
          />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
