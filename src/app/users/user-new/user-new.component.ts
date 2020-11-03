import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { plainToClass } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  roles: string[] = ["Developer", "Project Manager"];
  userNewForm: FormGroup;
  
  
  constructor(private userService: UserService, private toastr: ToastrService,
    public dialogRef: MatDialogRef<UserNewComponent>) {
      this.userService.dialog = this.dialogRef;
     }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userNewForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    });
  }

  saveUser(){
    this.userService.registerUser(this.userNewForm.controls.name.value, this.userNewForm.controls.surname.value,
      this.userNewForm.controls.email.value,this.userNewForm.controls.role.value, this.userNewForm.controls.username.value, this.userNewForm.controls.password.value, 
      this.userNewForm.controls.confirmPassword.value)
    .subscribe((data: any)=>{
      
      var user = plainToClass(User, data);
      if(user.role === "Developer"){
        this.userService.developers.push(user);
      }else if(user.role === "ProjectManager"){
        this.userService.projectManagers.push(user);
      }
      this.toastr.success("", "Successfully registered user");
      this.userService.dialog.close();
    }, (err) =>{
      console.log(err.error);
      if(err.error){
        if(err.error.message){
          this.toastr.error(err.error.message, "Error")
        }
        if(err.error.errors){
          this.toastr.error(err.error.errors.ConfirmPassword[0], "Error")
        }
      }
    })
  }

}
