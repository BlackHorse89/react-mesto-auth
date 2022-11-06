import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext); 

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватарка" />
        </div>
        <div className="profile__text">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__button" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section className="gallery" aria-label="галерея каточек">
        <ul className="cards">
          {props.cards.map((card) => (
            <Card 
              card={card} 
              onCardOpen={props.onClickCard} 
              key={card._id} 
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}/>
          ))}
        </ul>
      </section>
    </main>
  )
}
export default Main;