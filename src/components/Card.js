import React from "react";


function Card(props) {

    function handleClick() {
      props.onCardClick(props.card);
    } 

    return ( 
          <article className="card">
            <button type="button" className="card__delete"></button>
            <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="card__content">
              <h2 className="card__title">{props.card.name}</h2>
              <div>
                <button className="card__like" type="button" aria-label="Нравится"></button>
                <p className="card__likesCounter"></p>
              </div>
            </div>
          </article>
    )
}

export default Card;