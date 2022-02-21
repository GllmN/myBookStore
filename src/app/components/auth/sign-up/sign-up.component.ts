import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ProfilService} from "../../../services/profil.service";
import {FormValidationService} from "../../../services/form-validation.service";
import {User} from "../../../models/User.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  errorMessage!: any;
  userUID: any;
  isConnected!: boolean;
  // username: any;
  // email: any;
  // password: any;
  // confirmPassword: any;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private formValidationService: FormValidationService,
              private profilService: ProfilService,
              private fireAuth: AngularFireAuth,
              private router: Router) { }

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged(
      (user) => {
        if(user) {
          this.isConnected = true;
          this.userUID = user.uid;
        } else {
          this.isConnected = false;
        }
      }
    );
    this.initUserFormCreate();
  }

  /**
   * Create form sign-up
   */
  initUserFormCreate() {
    this.signUpForm = this.formBuilder.group( {
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    }, {
      // validators: this.formValidationService.matchPassword()
      //validators: this.formValidationService.matchPassword('password','confirmPassword')
    });
  }

  /**
   * Save user profil in Firebase Authentification (Data Login) and Firestore (Full data user)
   */
  onSaveUserProfil() {
    const username = this.signUpForm.get('username')!.value;
    const email = this.signUpForm.get('email')!.value;
    const password = this.signUpForm.get('password')!.value;

    this.authService.signUpUser(email, password)
      .then(
        () => {
          this.router.navigate(['/book-list'])

          const newUser = new User(username, email, this.userUID);
          this.profilService.createUserProfil(newUser)
          //   .then(
          // userAdded => {
          //   this.booksService.navigateToBookDetail(bookAdded.id);
          // })
          // } else {
          //   this.book.title = this.bookForm.get('title')!.value;
          //   this.book.author = this.bookForm.get('author')!.value;
          //   this.book.date = this.bookForm.get('date')!.value;
          //
          //   // Update object to database and redirect to detail
          //   this.booksService.updateBook(this.book, id).then(
          //     () => {
          //       this.booksService.navigateToBookDetail(id);
          //     }
          //   )
          // }

        },
        (error) => {
          this.errorMessage = error
          console.log('errorMessage : ', this.authService.signUpUser(email, password)
            .catch())
        }
      );

  }
}
