import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  isConnected!: boolean;

  constructor(private authService: AuthService,
              private fireAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged(
      (user) => {
        if(user) {
          this.isConnected = true;
        } else {
          this.isConnected = false;
        }
      }
    );
  }

}
