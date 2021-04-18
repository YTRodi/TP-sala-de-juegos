import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { UserI } from '../../../auth/pages/interfaces/user';
import { NavI } from './interfaces/nav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user!: UserI;

  public routesSideNav: NavI[] = [
    { to: '/protected/dashboard', icon: 'dashboard', routeName: 'Dashboard' },
    { to: '/protected/dashboard', icon: 'games', routeName: 'Games' },
    { to: '/protected/about', icon: 'portrait', routeName: 'About' },
    { to: '/protected/chat', icon: 'chat', routeName: 'Chat' },
  ];

  constructor(
    private angularFireAuthService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.angularFireAuthService.getCurrentUser();
      // console.log(this.user);
    } catch (error) {
      // Este error puedo mostrarlo en un snackBar
      console.log(error.message);
    }
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
