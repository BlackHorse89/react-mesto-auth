import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChange(e) {
    setDescription(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({name, about: description,});
  }

  return (
    <PopupWithForm name="type_edit-profile" form="form_profile" title="Редактировать профиль"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Имя" className="popup__text popup__text_name" id="popup-name" 
            required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
          <span className="popup__error-visible popup-name-error"></span>
          <input type="text" name="about" placeholder="Работа" className="popup__text popup__text_job" id="popup-job" 
            required minLength="2" maxLength="200" value={description || ''} onChange={handleChange} />
          <span className="popup__error-visible popup-job-error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup;