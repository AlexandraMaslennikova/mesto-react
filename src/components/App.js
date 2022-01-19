import React from 'react';
import '../index.css';

import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  //создание стейтов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

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

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}/>
        <Footer />

        <PopupWithForm name='edit-avatar' title='Обновить аватар' buttonName='Сохранить' isOpen={isEditAvatarPopupOpen}>
          <form className="popup__form" name="form" novalidate>
            <input 
            className="popup__input popup__input_type_avatar"
            id="avatar"
            type="url"
            placeholder="Введите ссылку на аватар"
            name="avatar"
            required/>
            <span id="avatar-error" className="error"></span>
          </form>
        </PopupWithForm>

        <PopupWithForm name='edit-profile' title='Редактировать профиль' buttonName='Сохранить' isOpen={isEditProfilePopupOpen}>
          <form className="popup__form" name="form" novalidate>
            <input 
            className="popup__input popup__input_type_name"
            id="user-name"
            type="text" 
            placeholder="Имя" 
            name="name"
            minlength="2"
            maxlength="40"
            required/>
            <span id="user-name-error" className="error"></span>
            <input 
            className="popup__input popup__input_type_job"
            id="about"
            type="text"
            placeholder="Профессия"
            name="about"
            minlength="2"
            maxlength="200"
            required/>
            <span id="about-error" className="error"></span>
          </form>
        </PopupWithForm>
        <PopupWithForm name='add-card' title='Новое место' buttonName='Создать' isOpen={isAddPlacePopupOpen}> 
          <form className="popup__form" name="placeForm" novalidate>
            <input
            className="popup__input popup__input_type_place"
            id="name"
            type="text"
            placeholder="Название"
            name="name"
            minlength="2"
            maxlength="30"
            required/>
            <span id="name-error" className="error"></span>
            <input
            className="popup__input popup__input_type_link"
            id="link"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required/>
            <span id="link-error" className="error"></span>
          </form>
        </PopupWithForm>

        <PopupWithForm name='confirm' title='Вы уверены' buttonName='Да'/>
        <ImagePopup />
    
    <template className="card-template">
      <article className="card">
        <button typeName="button" class="card__delete"></button>
        <img className="card__image" src="#" alt="Карточка места"/>
        <div className="card__content">
          <h2 className="card__title"></h2>
          <div>
            <button className="card__like" type="button" aria-label="Нравится"></button>
            <p className="card__likesCounter"></p>
          </div>
        </div>
      </article>
    </template>
  </div>
    </div>
  );
}

export default App;
