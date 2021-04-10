import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Icon } from '../../../protected/pages/about/interfaces/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LogUserService } from '../../services/log-user.service';
import { UserLogI } from '../interfaces/userLog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public lista: any;
  public hide = true;

  public email = new FormControl('prueba@gmail.com', [
    Validators.required,
    Validators.email,
  ]);
  public password = new FormControl('123456');
  public loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  public listIcons: Icon[] = [
    {
      src: '../../../../assets/icons/social media/google.svg',
      alt: 'Google icon',
      name: 'Google',
    },
    {
      src: '../../../../assets/icons/social media/github.svg',
      alt: 'Github icon',
      name: 'Github',
    },
    {
      src: '../../../../assets/icons/social media/facebook.svg',
      alt: 'Facebook icon',
      name: 'Facebook',
    },
  ];

  constructor(
    private angularFireAuthService: AuthService,
    private router: Router,
    private logUserService: LogUserService
  ) {}

  ngOnInit(): void {
    // this.logUserService.getAllUsersLogs().subscribe(console.log);
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no válido' : '';
  }

  async onLoginEmailPassword(): Promise<void> {
    try {
      const { email, password } = this.loginForm.value;
      const user = await this.angularFireAuthService.login(email, password);
      const objUserForLog: UserLogI = { email, loggedAt: new Date().getTime() };

      if (user) {
        this.logUserService.saveUserLog(objUserForLog);
        this.router.navigate(['/protected/dashboard']);
      }
    } catch (error) {
      // Este error puedo mostrarlo en un snackBar
      console.log(error.message);
    }
  }
}
