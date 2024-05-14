import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import { LoginService } from './login.service';
import { SignupService } from '../signup/signup.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = { username: '', password: '' };

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm): void {
    if (loginForm.invalid) {
      return;
    }

    this.loginService.login(this.loginModel).subscribe(
      (response) => {
        this.router.navigate(['/lobby']);
      },
      (error) => {
        console.log('Login error:', error);
      }
    );

    if (!this.isPasswordValid(this.loginModel.password)) {
      alert(
        'Password must contain at least 8 characters, including at least one letter and one number'
      );
      return;
    }

    this.loginService.login(this.loginModel).subscribe(
      (response) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
  }

  signUp(): void {
    this.router.navigate(['/signup']);
  }

  isEmailValid(email: string): boolean {
    return this.signupService.isEmailValid(email);
  }

  isPasswordValid(password: string): boolean {
    return this.signupService.isPasswordValid(password);
  }
}
