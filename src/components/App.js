import React from 'react';
import { useState } from "react";
import api from '../utils/api';
import '../index.css';

import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  //создание стейтов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //карточки
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  //данные пользователя
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  

  //получение данных о пользователе
  React.useEffect(() => {
    api.getUserInformation()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
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
    <div className="App">
      <div className="page">
        <Header />
        <Main 
          userName={userName}
          userDescription= {userDescription}
          userAvatar={userAvatar}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
        />
        <Footer />

        <PopupWithForm 
          name='edit-avatar' 
          title='Обновить аватар' 
          buttonName='Сохранить' 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <form className="popup__form" name="form" /*novalidate*/>
            <input 
              className="popup__input popup__input_type_avatar"
              id="avatar"
              type="url"
              placeholder="Введите ссылку на аватар"
              name="avatar"
              required
            />
            <span id="avatar-error" className="error"></span>
          </form>
        </PopupWithForm>

        <PopupWithForm 
          name='edit-profile' 
          title='Редактировать профиль' 
          buttonName='Сохранить' 
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <form className="popup__form" name="form" /*novalidate*/>
            <input 
              className="popup__input popup__input_type_name"
              id="user-name"
              type="text" 
              placeholder="Имя" 
              name="name"
              // minlength="2"
              //maxlength="40"
              required
            />
            <span id="user-name-error" className="error"></span>
            <input 
              className="popup__input popup__input_type_job"
              id="about"
              type="text"
              placeholder="Профессия"
              name="about"
              //minlength="2"
              //maxlength="200"
              required
            />
            <span id="about-error" className="error"></span>
          </form>
        </PopupWithForm>
        <PopupWithForm 
          name='add-card' 
          title='Новое место' 
          buttonName='Создать' 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        > 
          <form className="popup__form" name="placeForm" /*novalidate*/>
            <input
              className="popup__input popup__input_type_place"
              id="name"
              type="text"
              placeholder="Название"
              name="name"
              //minlength="2"
              //maxlength="30"
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
          </form>
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
  );
}

export default App;
