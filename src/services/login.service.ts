import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private API_URL = 'https://dummyjson.com/auth';
  

  login(username, password){
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

  logout(){
    localStorage.removeItem('token');
  }

  

}