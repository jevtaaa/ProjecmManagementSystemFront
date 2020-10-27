import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loggedUser: User;
    ngrokUrl: string = "https://28de6b3792f5.ngrok.io/api/";

    constructor(private http: HttpClient, private router: Router) {

    }

    logIn(username: string, password: string) {
        const httpBody = {
            "username": username,
            "password": password
        };
        return this.http.post(this.ngrokUrl+'account/login', httpBody);
    }

    logOut() {
        localStorage.removeItem('token');
        this.loggedUser = null;
        this.router.navigateByUrl('/login');
    }

    isAuth() {
        return localStorage.getItem('token') != null;
    }

    roleMatch(allowedRoles): boolean {
        var isMatch = false;
        var playload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = playload.role;
        allowedRoles.forEach(element => {
            if (userRole == element) {
                isMatch = true;
            }
        });
        return isMatch;
    }

}