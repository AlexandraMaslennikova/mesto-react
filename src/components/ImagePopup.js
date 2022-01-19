import React from "react";

function ImagePopup() {
  return(
    <article className="popup popup_type_image">
      <figure className="popup__conteiner popup__conteiner_type_image">
        <button className="popup__close popup__close_type_image" aria-label="Закрыть окно редактирования"></button>
        <img className="popup__image" src="#" alt="Просмотр изображения"/>
        <figcaption className="popup__title popup__title_type_image"></figcaption>
      </figure>
    </article>
  )
}

export default ImagePopup;