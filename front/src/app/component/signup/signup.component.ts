import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {SignUpRequest} from '../../model/signup-request.model';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'wk-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public usernameErrorMessage: string;
  public emailErrorMessage: string;
  public passwordErrorMessage: string;
  public signUpRequest: SignUpRequest;
  public usernameValidity: string;
  public emailValidity: string;
  public passwordValidity: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.signUpRequest = new SignUpRequest();
    this.usernameErrorMessage = "Username format is invalid";
    this.emailErrorMessage = "Email format is invalid";
    this.passwordErrorMessage = "Password format is invalid";
  }

  public onSubmit() {
    this.authService.signUp(this.signUpRequest)
      .subscribe(res => {
        this.router.navigate(['/chat']);
        location.reload();
      }, error => {
        this.setValidationError(error);
      });
  }

  private setValidationError(value) {
    if (Number(value.error.statusCode) === 409) {
      this.emailErrorMessage = 'User with this username or email already exists';
      this.emailValidity = "invalid";

      this.usernameErrorMessage = 'User with this username or email already exists';
      this.usernameValidity = "invalid";
    }
  }

}
