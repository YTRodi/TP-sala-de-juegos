import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { UserI } from '../../../auth/pages/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: UserI;

  constructor(
    private angularFireAuthService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.angularFireAuthService.getCurrentUser();

    // Puedo poner un flag de que está logeado y habilitar/deshabilitar algunas operaciones.
    // if (this.user) { console.log(this.user); }
  }

  async onLogout(): Promise<void> {
    try {
      await this.angularFireAuthService.logout();
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.log(error.message);
    }
  }
}
