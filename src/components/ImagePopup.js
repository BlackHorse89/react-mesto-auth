import React from "react";

function ImagePopup({isOpen, card, onClose}) {
  return (
    <div className={`popup popup_type_full-image ${isOpen && "popup_open"}`} aria-label="кратинки в попапе">
      <div className="popup__container-image">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__subtitle">{card.name}</p>
      </div>
    </div>
  )
}
export default ImagePopup;