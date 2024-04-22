import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private API_URL = 'https://dummyjson.com/auth';
  

  login = (username, password) => {
    return fetch(`${this.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      })
    })
  }

  logout = () => {
    localStorage.removeItem('token');
  }

  register = (username, password) => {
    return fetch(`${this.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      })
    })
  }

  checkSession = () => {
    return fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      }, 
    })
  }

  saveUserData = (data) => {
    localStorage.setItem("user",JSON.stringify({
      image: data.image,
      firstName: data.firstName,
      username: data.username
    }))
  }

  getUserData = () => {
    return JSON.parse( localStorage.getItem("user") );
  }
}