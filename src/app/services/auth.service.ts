import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loggedUser: User;
    ngrokUrl: string = "https://localhost:44365/api/";

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

    roleMatch(allowedRoles: string[]): boolean {
        var isMatch = false;
        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = payload.role;
        allowedRoles.forEach(element => {
            if (userRole == element) {
                isMatch = true;
            }
        });
        return isMatch;
    }

    getIdFromToken() {
        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        return payload.unique_name;
    }

}