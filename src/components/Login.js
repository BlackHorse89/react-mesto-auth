import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Login ({onLogin, loggedIn}) {
  const [userData, setUserData] = useState({email: '', password: ''});

  // Супер handleChange.
  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(userData.email, userData.password)
  }

  if (loggedIn) {
    return <Redirect to="/" />;
  }
  return(
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input className="login__input" placeholder="Email" type="email" name="email"
              value={userData.email} onChange={handleChange} />
        <input className="login__input" placeholder="Пароль" type="password" name="password"
              value={userData.password} onChange={handleChange} />
        <button className="login__submit" type="submit">Войти</button>
      </form>
    </section>
  )
}
export default Login;