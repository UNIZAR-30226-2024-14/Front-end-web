import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginModel: LoginModel = {
    email: '',
    password: '',
    rememberMe: false,
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.loginService.login(this.loginModel).subscribe(
      (response) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Login error:', error);
      }
    );
  }
}
