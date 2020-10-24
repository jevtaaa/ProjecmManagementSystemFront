import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isAuth = false;
    loggedUser: User;

    constructor(private http: HttpClient, private router: Router) {

    }

    logIn(username: string, password: string) {
        const httpBody = {
            "username": username,
            "password": password
          };
          return this.http.post('https://localhost:44365/api/account/login', httpBody);
    }

    logOut() {
        localStorage.clear();
        this.loggedUser = null;
        this.isAuth = false;
        this.router.navigateByUrl('/login');
    }


}