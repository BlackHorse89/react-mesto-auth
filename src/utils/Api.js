export class Api {
  constructor({baseUrl, token}) {
    this._baseUrl = baseUrl;
    this._token = token;
  }

  _checkServer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то не работает: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
    })
    .then(this._checkServer)
  }

  postNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
         authorization: this._token,
         'Content-Type': 'application/json'
       },
        body: JSON.stringify({
          name: data.name,
          link: data.link
       })
     })
     .then(this._checkServer)
   }

  deleteNewCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServer)
  }
  
  getInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServer)
    .then (response => {
      this.id = response._id
      return response
    })
  }

  patchInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._checkServer)
  }

  putLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServer)
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServer)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkServer)
  }

  patchAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkServer)
  }
}
 
 const api = new Api ({baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
                         token: '319bda5b-484e-4cb7-80d7-e3857f99b673'});
 export default api;