import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [p: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  // matchPassword(password: string, confirmPassword: string) {
  //   return (formGroup: FormGroup) => {
  //     const passwordControl = formGroup.controls[password];
  //     const confirmPasswordControl = formGroup.controls[confirmPassword];
  //
  //     if (!passwordControl || !confirmPasswordControl) {
  //       return null;
  //     }
  //
  //     if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
  //       return null;
  //     }
  //
  //     if (passwordControl.value !== confirmPasswordControl.value) {
  //       confirmPasswordControl.setErrors({ passwordMismatch: true });
  //     } else {
  //       confirmPasswordControl.setErrors(null);
  //     }
  //   }
  // }

  // matchPassword(): ValidatorFn {
  //   return (control:AbstractControl) : ValidationErrors | null => {
  //     const password = control.get('password')?.value;
  //     const confirmPassword = control.get('confirmPassword')?.value;
  //
  //   if (password && confirmPassword && password === confirmPassword) {
  //   return { passwordsDontMatch: true }
  //   }
  //   return null;
  //   };
  // }
}
