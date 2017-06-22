import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SignInRequest } from '../../model/signin-request.model';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'wk-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  emailErrorMessage: string;
  passwordErrorMessage: string;
  signInRequest: SignInRequest;
  emailValidity: string;
  passwordValidity: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.signInRequest = new SignInRequest();
    this.emailErrorMessage = "Email format is invalid";
    this.passwordErrorMessage = "Password format is invalid";
  }

  onSubmit() {
    this.authService.signIn(this.signInRequest)
      .subscribe(res => {
        this.router.navigate(['/chat']);
        location.reload();
      }, error => {
        this.setValidationError(error);
      });
  }

  private setValidationError(error) {
    if(error.target === 'email') {
      this.emailErrorMessage = error.message;
      this.emailValidity = "invalid";
    } else if(error.target === 'password') {
      this.passwordErrorMessage = error.message;
      this.passwordValidity = "invalid";
    }
  }

}
