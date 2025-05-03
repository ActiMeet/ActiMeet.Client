import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'currentUser';
  constructor() {}

  setUser(user: string) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.userKey) || '{}');
  }

  clearUser() {
    localStorage.removeItem(this.userKey);
  }
}
