import React from "react";
import Success from '../images/Union.svg';
import Failed from "../images/redkrest.svg";

function InfoTooltip ({isOpen, onClose, registed}) {

  function handleOverlayClose(e) {
    if(e.target === e.currentTarget) {
      onClose();
    }
  };

  return(
    <div className={`popup popup__type_small ${isOpen && "popup_open"}`}  onClick={handleOverlayClose}>
      <div className="popup__container popup__container_small">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__subinfo" 
            src={registed ? Success : Failed} alt="состояние регистрации"/>
        <p className="popup__description">
                {registed ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!Попробуйте ещё раз.'}</p>
      </div>
    </div>
  )
}
export default InfoTooltip;