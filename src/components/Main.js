import React from "react";



function Main(props) {
    return (
      <main className="content">
        <section className="profile page__section">
          <div className="profile__item">
            <button 
            className="profile__avatar-btn"
            aria-label="Редактировать аватар профиля"
            onClick={props.onEditAvatar}
            ></button>
            <img className="profile__avatar" src="#" alt="Фотография профиля"/>
            <div className="profile__info">
              <h1 className="profile__title"></h1>
              <button 
              className="profile__edit-btn" 
              aria-label="Редактировать имя и профессиию"
              onClick={props.onEditProfile}
              ></button>
              <p className="profile__subtitle"></p>
            </div>
          </div>
          <button 
          className="profile__add-btn" 
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="cards page__section">
        </section>
      </main>
    )
}

export default Main;