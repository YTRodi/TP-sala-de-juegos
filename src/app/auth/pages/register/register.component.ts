import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  public hide = true;
  public minLengthPassword = 6;

  public email = new FormControl('', [Validators.required, Validators.email]);

  public password = new FormControl('', [Validators.required, Validators.minLength(this.minLengthPassword)]);
  public confirmPassword = new FormControl('', [Validators.required, Validators.minLength(this.minLengthPassword)]);

  public passwords = new FormGroup({
    password: this.password,
    confirmPassword: this.confirmPassword
  });
// }, { validators: this.matchValidator('password', 'confirmPassword') }); //! FASE DE PRUEBAS!!!!

  public registerForm = new FormGroup({
    email: this.email,
    passwords: this.passwords
  });

  constructor(private angularFireAuthService: AuthService) { }

  ngOnInit(): void {
  }

  //! FASE DE PRUEBAS
  matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      
      const controlNameRefValue = control.get(controlName)?.value;
      const matchingControlRefValue = control.get(matchingControlName)?.value;

      // const result = controlNameRefValue !== matchingControlRefValue
      // console.log(control.value)
      // console.log({ match: { value: controlNameRef } })
      
      /**
       * RETORNA:
       *  null: si el valor de control es válido.
       *  o un objeto de error de validación
       */
      // console.log('PASSWORDS DISTINTOS: ' + result)
      // console.log(this.registerForm?.controls)
      // const result = (controlNameRefValue !== matchingControlRefValue) ? { match: false } : null;
      const result = (matchingControlRefValue !== controlNameRefValue) ? { match: { value: controlNameRefValue } } : null;
      console.log(result)
      
      return result;
      // return (controlNameRefValue !== matchingControlRefValue) ? { match: { value: controlNameRefValue } } : null;
    };
  }

  getErrorMessageEmail(): string {
    if (this.email.hasError('required')) return 'Debes ingresar un valor';

    return this.email.hasError('email') ? 'Email no válido' : '';
  }

  getErrorMessagePassword(): string {   
    if (this.password.hasError('required') || this.confirmPassword.hasError('required')) return 'Debes ingresar un valor';

    return (!this.password.hasError('minLength') || !this.confirmPassword.hasError('minLength')) ? 'Debe de contener 6 carácteres como mínimo' : '';
  }

  async onRegister() {
    if ( this.passwords.controls?.password.value !== this.passwords.controls?.confirmPassword.value ) {
      // Activar flag para mostrar el error en un snackbar o mat-error.
      console.log('Se cancela el submit, los passwords no son iguales.')
      return ;
    }
    
    try {
      const { email, passwords: { password } } = this.registerForm.value;
      const user = await this.angularFireAuthService.register(email, password);

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
