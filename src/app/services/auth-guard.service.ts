import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
              private fireAuth: AngularFireAuth,) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        this.fireAuth.onAuthStateChanged(
          (user)=> {
            if(user) {
              resolve(true)
            } else {
              console.log('Auth Guard: user is not logged in');
              this.router.navigate(['/signin']);
              reject(false);
            }
          }
        );
      }
    );
  }
}
