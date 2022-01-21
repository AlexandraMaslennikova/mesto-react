import React from "react";
import Card from "./Card";


function Main(props) {

    return (
      <main className="content">
        <section className="profile page__section">
          <div className="profile__item">
            <button 
              className="profile__avatar-btn"
              aria-label="Редактировать аватар профиля"
              onClick={props.onEditAvatar}
            >
            </button>
            <img className="profile__avatar" src={props.userAvatar} alt="Фотография профиля"/>
            <div className="profile__info">
              <h1 className="profile__title">{props.userName}</h1>
              <button 
                className="profile__edit-btn" 
                aria-label="Редактировать имя и профессиию"
                onClick={props.onEditProfile}
              >
              </button>
              <p className="profile__subtitle">{props.userDescription}</p>
            </div>
          </div>
          <button 
            className="profile__add-btn" 
            aria-label="Добавить карточку"
            onClick={props.onAddPlace}
          >
          </button>
        </section>
        <section className="cards page__section">
          {props.cards.map((card) => {
                return (
                  <Card 
                    key={card._id}
                    card={card}
                    onCardClick={props.onCardClick} />
                )
            })}
        </section>
      </main>
    )
}

export default Main;