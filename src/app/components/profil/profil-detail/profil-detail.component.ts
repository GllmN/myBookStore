import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/User.model";
import {ProfilService} from "../../../services/profil.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-profil-detail',
  templateUrl: './profil-detail.component.html',
  styleUrls: ['./profil-detail.component.scss']
})
export class ProfilDetailComponent implements OnInit {

  user: any;
  idDocUser!: any;
  isConnected!: boolean

  constructor(private activatedRoute: ActivatedRoute,
              private profilService : ProfilService,
              private fireAuth: AngularFireAuth,
              private router: Router) { }

  ngOnInit(): void {

    this.user = new User('','','');

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
            })
        } else {
          this.isConnected = false;
        }
      });
  }

  onBack() {
    this.router.navigate(['/book-list']);
  }

}

