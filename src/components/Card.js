import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardOpen, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`cards__delete ${isOwn ? 'cards__delete' : 'cards__delete_disable'}`);
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`cards__like ${isLiked ? 'cards__like_active' : 'cards__like'}`);

  function handleCardClick() {
    onCardOpen(card)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card)
  }

  return (
    <li className="cards__element">
      <img className="cards__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}></button>
      <div className="cards__item">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-box">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="cards__glory">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}
export default Card;