import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header ({title, loggedIn, logout, useData, route}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <nav className="header__nav">
        {loggedIn ? <p className="header__profile">{useData}</p>
                  : <p className="header__profile">{null}</p>}
        {loggedIn ? <Link className="haeder__link" to={route} onClick={logout}>{title}</Link>
                  : <Link className="haeder__link" to={route} onClick={null}>{title}</Link>}
      </nav>
   </header>
  )
}
export default Header;