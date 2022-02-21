import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isConnected!: boolean;
  auState: any;

  constructor(private router: Router,
              private fireAuth: AngularFireAuth) {}

  /**
   *
   */
  getUID(): string {
    return this.auState.uid;
  }

  /**
   * Sign up new user with email and password for authentication
   * @param email
   * @param password
   */
  signUpUser(email: string, password: string): Promise<void> {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.fireAuth.onAuthStateChanged(
          (user) => {
            if(user) {
              this.isConnected = true;
            }
          }
        )
      });
  }

  /**
   * Connect existing user with email and password from authentication firebase
   * @param email: email of this user
   * @param password: password of this user
   */
  signInUser(email: string, password: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        return this.isConnected = true;
      })
      .catch(error => {
        console.log('Auth Service: login error...');
          return error.code;
      });
  }

  /**
   * Disconnect user
   */
  signOutUser(): Promise<any> {
    return this.fireAuth.signOut()
      .then(() => {
        this.router.navigate(['/signin']);
        console.log('Auth Service: user logout');
      })
      .catch(error => {
        console.log('Auth Service: logout error...');
        if (error.code)
          return error;
      });

  }
}
