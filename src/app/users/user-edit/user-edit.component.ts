import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { plainToClass } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  roles: string[] = ["Developer", "Project Manager"];
  userEditForm: FormGroup;

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: { user: User },
  public dialogRef: MatDialogRef<UserEditComponent>, private toastr: ToastrService) { 
    this.userService.dialogEdit = this.dialogRef;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userEditForm = new FormGroup({
      name: new FormControl(this.data.user.name, [Validators.required]),
      surname: new FormControl(this.data.user.surname, [Validators.required]),
      email: new FormControl(this.data.user.email, [Validators.required]),
      role: new FormControl(this.setValue(), [Validators.required])
    });
  }
  
  setValue() {
    if(this.data.user.role === "ProjectManager"){
      return "Project Manager"
    }
    return this.data.user.role;
  }

  editUser(){
    this.userService.updateUser(this.data.user.id, this.userEditForm.controls.name.value, this.userEditForm.controls.surname.value,
      this.userEditForm.controls.email.value,this.userEditForm.controls.role.value)
    .subscribe((data: any)=>{
      var user = plainToClass(User, data);

      if(user.role == "ProjectManager"){
        if(this.data.user.role == "Developer"){
          this.userService.removeFromUsers(this.data.user);
          this.userService.projectManagers.push(user);
        }else{
          this.userService.projectManagers = this.userService.projectManagers.map(item => {
            if(item.id == user.id){
              item = user;
            }
            return item;
          });
        }   
      }else if (user.role == "Developer"){
        if(this.data.user.role == "ProjectManager"){
          this.userService.removeFromUsers(this.data.user);
          this.userService.developers.push(user);
        }else{
          this.userService.developers = this.userService.developers.map(item => {
            if(item.id == user.id){
              item = user;
            }
            return item;
          });
        }
      }
      this.toastr.success("","Successfully updated user!")
      this.userService.dialogEdit.close();
    }, (err)=>{
      console.log(err);
    })
  }

}
