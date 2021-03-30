import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

// function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {forbiddenName: {value: control.value}} : null;
//   };
// }

//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const forbidden = nameRe.test(control.value);
//     return forbidden ? {forbiddenName: {value: control.value}} : null;
//   };
// }

// -----------------
// function passwordEqualValidator(passwordTwo: string): ValidatorFn {
//   return (control: AbstractControl): Boolean => {
//     return 
//   }
// }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public hide = true;
  public minLengthPassword = 6;

  public email = new FormControl('prueba@gmail.com', [Validators.required, Validators.email]);
  public passwordOne = new FormControl('12345', [Validators.required, Validators.minLength(this.minLengthPassword)]);
  // AGREGARLE un Validators al passwordOne que verifique que sea igual al passwordTwo.
  public passwordTwo = new FormControl('123456', [Validators.required, Validators.minLength(this.minLengthPassword)]);
  public registerForm = new FormGroup({
    email: this.email,
    passwordOne: this.passwordOne,
    passwordTwo: this.passwordTwo,
  });

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessageEmail(): string {
    if (this.email.hasError('required')) return 'Debes ingresar un valor';

    return this.email.hasError('email') ? 'Email no válido' : '';
  }

  // TODO: VALIDAR QUE NO ESTÉN VACIOS LOS PASSWORDS(REQUIRED), QUE SEAN IGUAL O MAYORES A 6 CARACTERES Y QUE SEAN IGUALES (PASSWORD ONE === PASSWORD TWO)
  getErrorMessagePassword(): string {
    console.log(this.passwordOne.errors);

    if (this.passwordOne.hasError('required')) return 'Debes ingresar un valor';

    return !this.passwordOne.hasError('minLength') ? 'Debe de contener 6 carácteres como mínimo' : '';
  }

  onSubmit() {
    console.log(this.passwordOne.value === this.passwordTwo.value);

    // console.log(this.passwordOne.value)
    // console.log(this.passwordTwo.value)
    console.log(this.registerForm.value);
  }

}
