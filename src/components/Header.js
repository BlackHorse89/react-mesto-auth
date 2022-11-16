import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header ({ email, logout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      <nav className="header__nav">
        <Switch>
          <Route path="/sign-in">
            <Link className="haeder__link" to="/sign-up">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
            <Link className="haeder__link" to="/sign-in">Войти</Link>
          </Route>
          <Route path="/" exact>
            <p className="header__profile">{email}</p>
            <Link className="haeder__link" to="/sign-up" onClick={logout}>Выйти</Link>
          </Route>
        </Switch>
      </nav>
   </header>
  )
}
export default Header;