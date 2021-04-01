import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  constructor(private angularFireAuthService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  async onLogout() {
    try {
      await this.angularFireAuthService.logout();
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.log(error.message);
    }
  }
}
