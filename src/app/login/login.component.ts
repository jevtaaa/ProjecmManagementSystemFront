import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword = true;

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
     
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  
    })
  }

  getErrorMessagePassword() {
    if (this.loginForm.get('password').hasError('required')) {
      return 'You must enter a value'
    }

    return this.loginForm.get('password').hasError('minlength') ? 'Minimum 8 characters' : '';
  }

  onSubmit() {
    if(this.loginForm.status==="INVALID"){
      return
    }
    console.log(this.loginForm.value)
    this.router.navigateByUrl('/home')
    

  }

}
