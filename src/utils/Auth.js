export const newBase = 'https://auth.nomoreparties.co';

const checkServer = res => res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);

export const registration = ({email, password}) => {
  return fetch(`${newBase}/signup`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(checkServer)
}

export const authorize = (email, password) => {
  return fetch(`${newBase}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(checkServer)
}

export const getContent = (token) => {
  return fetch(`${newBase}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(checkServer)
};