import React from "react";

function PopupWithForm({name, isOpen, container, onClose, form, title, children, onSubmit}) {

  return (
    <div className={`popup popup_${name} ${isOpen && "popup_open"}`}>
      <div className={`popup__container popup__container-${container}`}>
        <button className="popup__close" type="button" onClick={onClose}></button>
        <form className={`popup__form popup__${form}`} name={form} onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__save " type="submit" >Сохранить</button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm;