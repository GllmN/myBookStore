import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {User} from "../models/User.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  users: User[] = [];
  isActive!: boolean;
  urlDatabaseFire = environment.firebase;

  constructor(private firestore: AngularFirestore) { }

  /**
   * Get a current user
   * @param id: id of user
   */
  getCurrentUser(id: string) {

    return this.firestore
      .collection<User>('/users', ref => ref.where("userUID", "==", id))
      .get()
  }

  /**
   * Create a user
   * @param user: object of user
   */
  createUserProfil(user: User){
    return this.firestore
      .collection<User>('/users')
      .add({
        username: user.username,
        userUID: user.userUID,
        email: user.email,
      })
  }

}
