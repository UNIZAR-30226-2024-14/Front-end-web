import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../styles.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  playBlackjack(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(['/lobby']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
