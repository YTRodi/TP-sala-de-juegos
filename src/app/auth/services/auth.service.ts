import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

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

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
