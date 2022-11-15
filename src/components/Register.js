import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({onRegister}) {
  const [userData, setUserData] = useState({email: '', password: ''});


  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value})
  }

  function handleSubmit(e) {
    let {email, password} = userData;
    e.preventDefault();
    onRegister({email, password});
  }


  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Регистрация</h2>
        <input className="login__input" placeholder="Email" type="email" name="email"
              value={userData.email} onChange={handleChange} required minLength="10"/>
        <input className="login__input" placeholder="Пароль" type="password" name="password"
              value={userData.password} onChange={handleChange} required minLength="5"/>
        <button className="login__submit" type="submit">Зарегистрироваться</button>
        <Link className="login__link" to='sign-in'>Уже зарегистрированы? Войти</Link>
      </form>
    </section>
  )
}
export default Register;