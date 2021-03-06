import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LogUserService } from '../../services/log-user.service';
import { UserLogI } from '../interfaces/userLog';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public hidePassword = true;
  public hideConfirmPassword = true;
  public minLengthUserName = 3;
  public minLengthPassword = 6;

  public userName = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLengthUserName),
  ]);
  public email = new FormControl('', [Validators.required, Validators.email]);

  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLengthPassword),
  ]);
  public confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minLengthPassword),
  ]);

  public passwords = new FormGroup({
    password: this.password,
    confirmPassword: this.confirmPassword,
  });
  // }, { validators: this.matchValidator('password', 'confirmPassword') }); //! FASE DE PRUEBAS!!!!

  public registerForm = new FormGroup({
    userName: this.userName,
    email: this.email,
    passwords: this.passwords,
  });

  constructor(
    private angularFireAuthService: AuthService,
    private router: Router,
    private logUserService: LogUserService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {}

  getErrorMessageUserName(): string {
    if (this.userName.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return !this.userName.hasError('minLength')
      ? 'Debe de contener 3 carácteres como mínimo'
      : '';
  }

  getErrorMessageEmail(): string {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no válido' : '';
  }

  getErrorMessagePassword(): string {
    if (
      this.password.hasError('required') ||
      this.confirmPassword.hasError('required')
    ) {
      return 'Debes ingresar un valor';
    }

    return !this.password.hasError('minLength') ||
      !this.confirmPassword.hasError('minLength')
      ? 'Debe de contener 6 carácteres como mínimo'
      : '';
  }

  async onRegister(): Promise<void> {
    if (
      this.passwords.controls?.password.value !==
      this.passwords.controls?.confirmPassword.value
    ) {
      // Activar flag para mostrar el error en un snackbar o mat-error.
      console.log('Se cancela el submit, los passwords no son iguales.');
      return;
    }

    try {
      const {
        userName,
        email,
        passwords: { password },
      } = this.registerForm.value;
      const user =
        await this.angularFireAuthService.registerWithEmailAndPassword(
          userName,
          email,
          password
        );
      const objUserForLog: UserLogI = { email, loggedAt: new Date().getTime() };

      if (user) {
        this.logUserService.saveUserLog(objUserForLog);
        this.router.navigate(['/protected/dashboard']);
      }
    } catch (error) {
      this.notification.openSnackBar(error.message, 'Cerrar');
    }
  }
}
