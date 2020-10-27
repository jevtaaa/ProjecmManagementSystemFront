import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { plainToClass } from 'class-transformer';
import { User } from '../model/user.model';
import { UserDeleteComponent } from '../users/user-delete/user-delete.component';
import { UserEditComponent } from '../users/user-edit/user-edit.component';
import { UserNewComponent } from '../users/user-new/user-new.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  projectManagers: User[]; 
  developers: User[];
  dialog: MatDialogRef<UserNewComponent>;
  dialogEdit: MatDialogRef<UserEditComponent>;
  dialogDelete: MatDialogRef<UserDeleteComponent>;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.projectManagers = [];
    this.developers = [];
  }

  private getAllUsers() {
    return this.http.get(this.authService.ngrokUrl+'account/all');
  }

  fetchAllUsers(){

    if(!this.authService.roleMatch(['Admin', 'ProjectManager'])){
      return;
    }

    this.getAllUsers().subscribe((data:User[])=>{
      const devs: User[]=[];
      const pms: User[]=[];
      for(let user of data){
        if(user.role ==='Developer'){    
          devs.push(plainToClass(User, user));
          continue;
        }
        if(user.role ==='ProjectManager'){    
          pms.push(plainToClass(User, user));
          continue;
        }
      }
      this.developers = devs;
      this.projectManagers = pms;

    }, err =>{
      console.log(err);
    })
  }

  registerUser(name: string, surname: string, email: string, role: string, username: string, password: string, confirmPassword: string) {
      const httpBody = {
        "name": name,
        "surname": surname,
        "email": email,
        "role": role,
        "username": username,
        "password": password,
        "confirmPassword": confirmPassword
      };
      return this.http.post(this.authService.ngrokUrl + 'account/register', httpBody);
  }

  updateUser(userId: number, name: string, surname: string, email: string, role: string){
    const httpBody = {
      "name": name,
      "surname": surname,
      "email": email,
      "role": role
    };

    return this.http.put(this.authService.ngrokUrl + 'account/' + userId, httpBody);
  }

  deleteUser(userId: number){
    return this.http.delete(this.authService.ngrokUrl + 'account/' + userId);
  }

  removeFromUsers(user: User){
    if(user.role == "ProjectManager"){
      let index = this.projectManagers.indexOf(this.projectManagers.find(x => x.id == user.id));
      this.projectManagers.splice(index, 1);
    }else if(user.role == "Developer"){
      let index = this.developers.indexOf(this.developers.find(x => x.id == user.id));
      this.developers.splice(index, 1);
    }
  }

}
