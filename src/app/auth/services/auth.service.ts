import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<any> {
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

  async registerWithEmailAndPassword(
    userName: string,
    email: string,
    password: string
  ): Promise<any> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      user?.updateProfile({
        displayName: userName,
        photoURL: '../../../assets/images/no-user-image.jpg',
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async loginWithGoogle(): Promise<firebase.auth.UserCredential> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async loginWithGithub(): Promise<firebase.auth.UserCredential> {
    try {
      const provider = new firebase.auth.GithubAuthProvider();
      return await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async loginWithFacebook(): Promise<firebase.auth.UserCredential> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      return await this.afAuth.signInWithPopup(provider);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      const userCredentials = await this.afAuth.authState
        .pipe(first())
        .toPromise();

      return userCredentials;
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
