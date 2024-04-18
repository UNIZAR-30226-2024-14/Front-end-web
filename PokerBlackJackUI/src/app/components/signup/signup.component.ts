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

  constructor(private signupService: SignupService) {}

  signUp(): void {
    if (this.signupModel.password !== this.passwordAgain) {
      console.log('Passwords do not match');
      return;
    }

    this.signupService.signUp(this.signupModel).subscribe(
      (response) => {
        console.log('Signup successful:', response);
      },
      (error) => {
        console.log('Signup error:', error);
      }
    );
  }

  ngOnInit(): void {}
}
