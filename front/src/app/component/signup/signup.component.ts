import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SignUpRequest } from '../../model/signup-request.model';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'wk-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  usernameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  signUpRequest: SignUpRequest;
  usernameValidity: string;
  emailValidity: string;
  passwordValidity: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.signUpRequest = new SignUpRequest();
    this.usernameErrorMessage = "Username format is invalid";
    this.emailErrorMessage = "Email format is invalid";
    this.passwordErrorMessage = "Password format is invalid";
  }

  onSubmit() {
    this.authService.signUp(this.signUpRequest)
      .subscribe(res => {
        this.router.navigate(['/chat']);
        location.reload();
      }, error => {
        this.setValidationError(error);
      });
  }

  private setValidationError(error) {
    if(error.target === 'username') {
      this.usernameErrorMessage = error.message;
      this.usernameValidity = "invalid";
    } else if(error.target === 'email') {
      this.emailErrorMessage = error.message;
      this.emailValidity = "invalid";
    } else if(error.target === 'password') {
      this.passwordErrorMessage = error.message;
      this.passwordValidity = "invalid";
    }
  }

}
