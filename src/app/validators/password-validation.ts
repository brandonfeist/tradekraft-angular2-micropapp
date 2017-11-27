import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password') ? AC.get('password').value : AC.get('password');
    let confirmPassword = AC.get('confirmPassword') ? AC.get('confirmPassword').value : AC.get('confirmPassword');

    if(password != confirmPassword) {
      if(AC.get('confirmPassword')) {
        AC.get('confirmPassword').setErrors( { MatchPassword: true } );
      }
    } else {
      return null
    }
  }
}