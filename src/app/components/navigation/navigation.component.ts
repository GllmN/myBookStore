import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {ProfilService} from "../../services/profil.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  idDocUser!: string;
  user: any
  isConnected!: boolean;
  uid!:string;
  userUID!: string;

  constructor(private authService: AuthService,
              private profilService: ProfilService,
              private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged(
      (user) => {
        if(user) {
          this.isConnected = true;
          this.userUID = user.uid;

          this.profilService.getCurrentUser(this.userUID).subscribe(
            (snapshot) => {
              snapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data())
                this.idDocUser = doc.id;
              })
            })


        } else {
          this.isConnected = false;
        }
      }
    );
  }

  /**
   * View detail profil of user
   */
  onProfilDetailUser() {

    this.profilService.getCurrentUser(this.userUID).subscribe(
      (snapshot) => {
        snapshot.forEach(doc => {
          console.log(doc.id, " => ", doc.data())
          this.user = doc.data();
        })
      })
  }


  /**
   * Sign out user
   */
  onSignOut() {
    this.authService.signOutUser();
  }

}
