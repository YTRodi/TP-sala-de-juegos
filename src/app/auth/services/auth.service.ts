import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { UserI } from '../pages/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // TODO: Cambiarle el nombre a las funciones. Tendrían que llamarse loginEmailAndPassword, registerEmailAndPassword y
      //en los componentes login y registro deberian llamarse igual.

      // TODO: en el login/registro con google, facebook, github no ahce falta este paso porque estás dos props ya vienen seteadas.

      user?.updateProfile({
        // TODO: Generar un array con nombres ficticios para darle a los que se logeen con email y password
        // TODO: EJEMPLO: 'loro feroz, delfin asesino, tiburoncin uh ha ha'
        displayName: 'loro',
        photoURL: '../../../assets/images/no-user-image.jpg',
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser(): Promise<UserI> {
    const userCredentials = await this.afAuth.authState
      .pipe(first())
      .toPromise();

    const currentUser: UserI = {
      uid: userCredentials?.uid,
      displayName: userCredentials?.displayName,
      email: userCredentials?.email,
      photoURL: userCredentials?.photoURL,
    };

    return currentUser;
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
