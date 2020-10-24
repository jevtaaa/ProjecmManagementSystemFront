import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { plainToClass, TransformPlainToClass } from 'class-transformer';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  getErrorMessagePassword() {
    if (this.loginForm.get('password').hasError('required')) {
      return 'You must enter a value'
    }

    return this.loginForm.get('password').hasError('minlength') ? 'Minimum 8 characters' : '';
  }

  logIn() {
    this.authService.logIn(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
    .subscribe((data:any) => {
      if(data==null){
        return;
      }
      this.authService.isAuth = true;
      localStorage.setItem('token', data.token);
      data.token = null;
      this.authService.loggedUser = plainToClass(User, data);
      console.log(this.authService.loggedUser);
      this.toastr.success("Welcome " + this.authService.loggedUser.getUsername()+"", "Successfully login.");
      this.router.navigateByUrl('/home');
    },(err) => {
      if(err.status == 400){
        this.toastr.error("Incorrect username or password.", "Authentication failed.");
      }
      console.log(err);
    })
  }

  initForm(){
    this.loginForm = new FormGroup({
     
      username: new FormControl('Jevta1997', [Validators.required]),
      password: new FormControl('Jokic1997', [Validators.required, Validators.minLength(8)]),
  
    });
  }

}
