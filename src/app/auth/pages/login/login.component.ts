import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Icon } from '../../../protected/pages/about/interfaces/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('');
  public loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  public listIcons: Icon[] = [
    { src: '../../../../assets/icons/social media/google.svg', alt: 'Google icon', name: 'Google' },
    { src: '../../../../assets/icons/social media/github.svg', alt: 'Github icon', name: 'Github' },
    { src: '../../../../assets/icons/social media/facebook.svg', alt: 'Facebook icon', name: 'Facebook' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) return 'Debes ingresar un valor';

    return this.email.hasError('email') ? 'Email no válido' : '';
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

}
