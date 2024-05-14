import { Component, OnInit } from '@angular/core';
import { SignupModel } from './signup.model';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../../../styles.scss'],
})
export class SignupComponent implements OnInit {
  signupModel: SignupModel = {
    username: '',
    email: '',
    password: '',
  };

  passwordAgain: string = '';
  rememberMe: boolean = false;

  constructor(public signupService: SignupService) {}

  signUp(): void {
    if (this.signupModel.password !== this.passwordAgain) {
      alert('Passwords do not match');
      return;
    }

    if (!this.signupService.isEmailValid(this.signupModel.email)) {
      alert('Invalid email format');
      return;
    }

    if (!this.signupService.isPasswordValid(this.signupModel.password)) {
      alert(
        'Password must contain at least 8 characters, including at least one letter and one number'
      );
      return;
    }

    this.signupService.signUp(this.signupModel)
    .subscribe(
      (response) => {
        alert('Signup successful');
        console.log('Signup successful:', response);
      },
      (error) => {
        alert('Signup error: ' + error);
        console.log('Signup error:', error);
      }
    );
  }
  ngOnInit(): void {}
}
