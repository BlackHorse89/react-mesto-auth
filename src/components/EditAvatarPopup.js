import React ,{ useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const [avatar, setAvatar] = useState('');

  useEffect (() => {
    setAvatar('');
  }, [isOpen])

  function handleChange(e) {
    setAvatar(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar})
  }

  return (
    <PopupWithForm name="avatar" form="form_avatar" title="Обновить аватар" container="avatar"
      isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
       <input className="popup__text popup__text_avatar" type="url"  name="avatar" 
        id="popup-avatar" placeholder="ссылка на аватар" required minLength="10" value={avatar} onChange={handleChange} />
       <span className="popup__error-visible popup-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;