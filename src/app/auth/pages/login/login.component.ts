import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Icon } from '../../../protected/pages/about/interfaces/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public hide = true;

  public email = new FormControl('prueba@gmail.com', [Validators.required, Validators.email]);
  public password = new FormControl('123456');
  public loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  public listIcons: Icon[] = [
    { src: '../../../../assets/icons/social media/google.svg', alt: 'Google icon', name: 'Google' },
    { src: '../../../../assets/icons/social media/github.svg', alt: 'Github icon', name: 'Github' },
    { src: '../../../../assets/icons/social media/facebook.svg', alt: 'Facebook icon', name: 'Facebook' }
  ];

  constructor(private angularFireAuthService: AuthService) { }

  ngOnInit(): void {
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) return 'Debes ingresar un valor';

    return this.email.hasError('email') ? 'Email no válido' : '';
  }

  async onLoginEmailPassword() {
    try {
      const { email, password } = this.loginForm.value;
      const user = await this.angularFireAuthService.login(email, password);

      if(user) {
        // Redirecciono al dashboard.
        console.log(user);
      }
    } catch (error) {
      // Este error puedo mostrarlo en un snackBar
      console.log(error.message);
    }
  }

}
