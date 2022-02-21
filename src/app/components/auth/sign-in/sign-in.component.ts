import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  errorMessage!: any;
  isConnected!: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isConnected = false;
    this.initUserFormSignIn();
  }

  /**
   * Create form sign-in
   */
  initUserFormSignIn() {
    this.signInForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  async onSubmitUser(){
    const email = this.signInForm.get('email')!.value;
    const password = this.signInForm.get('password')!.value;

    const resultConnection = await this.authService.signInUser(email, password)

    if(resultConnection == true){
      await this.router.navigate(['/book-list'])
    } else if(resultConnection == 'auth/user-not-found') {
      this.errorMessage = 'Utilisateur non inscrit, veuillez vous inscrire.';
    } else if(resultConnection == 'auth/wrong-password') {
      this.errorMessage = 'Mot de passe de incorrect, veuillez saisir le mot de passe de nouveau.';
    }
  }

}
