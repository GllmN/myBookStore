import { Component, OnInit } from '@angular/core';
import {FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ProfilService} from "../../../services/profil.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  matcherTest : any;
  errorMessage!: any;
  userUID: any;
  isConnected!: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
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
    this.signUpForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: this.checkPasswords
      });
    }
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let checkPassword = group.get('password')!.value;
    let checkConfirmPassword = group.get('confirmPassword')!.value

    return checkPassword === checkConfirmPassword ? null : { notSame: true }
  }

  /**
   * Save user profil in Firebase Authentification (Data Login) and Firestore (Full data user)
   */
  async onSaveUserProfil() {
    const username = this.signUpForm.get('username')!.value;
    const email = this.signUpForm.get('email')!.value;
    const password = this.signUpForm.get('password')!.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')!.value;

    if(password.value != confirmPassword.value){
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
    } else {

      const resultRegistration = await this.authService.signUpUser(email, password)

      if(resultRegistration == true){
        this.router.navigate(['/book-list'])
      } else if(resultRegistration == 'auth/email-already-in-use') {
        this.errorMessage = 'Cet utilisateur existe déjà !'
      }
    }
  }
}
