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
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    const email = this.signInForm.get('email')!.value;
    const password = this.signInForm.get('password')!.value;
    //const userUID = this.authService.getUserByUID(this.userUID);
    this.authService.signInUser(email,password).then(
      () => {
        //console.log('test :');
        this.router.navigate(['/book-list']);
        //console.log('on submit :');
        //console.log(this.router.navigate(['/book-list'+ userID]));
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
