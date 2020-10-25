import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  projectManagers: User[];
  developers: User[];

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.projectManagers = [];
    this.developers = [];
  }

  private getAllUsers() {
    return this.http.get(this.authService.ngrokUrl+'account/all');
  }

  fetchAllUsers(){

    if(!this.authService.roleMatch(['Admin'])){
      return;
    }

    this.getAllUsers().subscribe((data:User[])=>{
      
      for(let user of data){
        if(user.role ==='Developer'){
          this.developers.push(plainToClass(User, user));
          continue;
        }

        if(user.role ==='ProjectManager'){
          this.projectManagers.push(plainToClass(User, user));
          continue;
        }
      }

    }, err =>{
      console.log(err);
    })
  }

}
