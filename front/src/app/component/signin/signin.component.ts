import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {SignInRequest} from '../../model/signin-request.model';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'wk-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  nameErrorMessage: string;
  nameValidity: string;
  passwordErrorMessage: string;
  passwordValidity: string;
  signInRequest: SignInRequest;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.signInRequest = new SignInRequest();
    this.nameErrorMessage = "Email or Username format is invalid";
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

  private setValidationError(value) {
    switch (Number(value.error.statusCode)) {
      case 404: {
        this.nameErrorMessage = 'User with this email or username not found';
        this.nameValidity = "invalid";
        break;
      }
      case 420: {
        this.nameErrorMessage = 'Email or username format is invalid';
        this.nameValidity = "invalid";
        break;
      }
      case 403: {
        this.passwordErrorMessage = 'Incorrect password';
        this.passwordValidity = "invalid";
        break;
      }
      default: {
        this.nameErrorMessage = value.error.message;
        this.nameValidity = "invalid";
      }
    }
  }

}
