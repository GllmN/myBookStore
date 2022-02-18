import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/User.model";
import {ProfilService} from "../../../services/profil.service";
import {AuthService} from "../../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-profil-view',
  templateUrl: './profil-view.component.html',
  styleUrls: ['./profil-view.component.scss']
})
export class ProfilViewComponent implements OnInit {

  user: any;
  isConnected!: boolean;
  //uid!: string;

  constructor(private activatedRoute: ActivatedRoute,
              private profilService: ProfilService,
              private authService: AuthService,
              private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {

    this.user = new User ('','','');

    this.fireAuth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.isConnected = true;

          const userUID = user.uid;

          this.profilService.getCurrentUser(userUID).subscribe(
            (snapshot) => {
              snapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data())
                this.user = doc.data();
              })
            });
        } else {
          this.isConnected = false;
        }
      });
  }
}

