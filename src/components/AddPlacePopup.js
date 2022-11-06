import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  useEffect (() => {
    setPlace('');
    setLink('');
  }, [isOpen])

  function handleChange(e) {
    setPlace(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name: place, link})
  }

  return (
    <PopupWithForm name="place" form="form_cards" title="Новое место"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Название" className="popup__text popup__text_place" 
          id="popup-place" required minLength="2" maxLength="30" value={place || ''} 
          onChange={handleChange} />
        <span className="popup__error-visible popup-place-error"></span>
        <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__text popup__text_image" 
          id="popup-image" required value={link || ''} onChange={handleChangeLink} />
        <span className="popup__error-visible popup-image-error"></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup;