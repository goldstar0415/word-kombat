import { Component, Input } from '@angular/core';

import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user.model';

declare const __moduleName: string;

@Component({
  moduleId: __moduleName,
  selector: 'user-details',
  templateUrl: 'user-details.html',
  styleUrls: ['user-details.css'],
  providers: [UsersService]
})
export class UserDetailsComponent {
  @Input() private user;

  private userNameError: string;
  private emailError: string;
  private passwordError: string;

  constructor(private usersService: UsersService) {
    this.user = new User();
  }

  update() {
    this.usersService.update(this.user.id, this.user)
      .subscribe(user => this.user.password = "", this.setErrorMessage);
  }

  validateUserDetails() {
    let emailValidationResult = this.validateEmail();
    let usernameValidationResult = this.validateUsername();
    let passwordValidationResult = this.validatePassword();

    if(emailValidationResult) {
      this.setErrorMessage(emailValidationResult);
      return emailValidationResult
    };

    if(usernameValidationResult) {
      this.setErrorMessage(usernameValidationResult);
      return usernameValidationResult
    };

    if(passwordValidationResult) {
      this.setErrorMessage(passwordValidationResult);
      return passwordValidationResult;
    }
  }

  validateEmail() {
    const VALID_EMAIL_REGEX = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

    let error = {
      target: "email",
      message: "Email format is incorrect"
    };

    if(!this.user.email) {
      error.message = "Enter email";
      return error;
    }

    if(!(VALID_EMAIL_REGEX.test(this.user.email))) {
      return error;
    }
  }

  validateUsername() {
    let error = {
      target: "username",
      message: "Username format is incorrect"
    };

    if(!this.user.name) {
      error.message = "Enter username";
      return error;
    }

    if(!(/^\w{4,30}$/gi.test(this.user.name))) {
      return error;
    }
  }

  validatePassword() {
    let error = {
      target: "password",
      message: "Password format is incorrect"
    };

    if(!this.user.password) {
      error.message = "Enter password";
      return error;
    }

    if(!(/^\S{6,30}$/gi.test(this.user.password))) {
      return error;
    }
  }

  isUserDetailsValid(): boolean {
    return !this.validateUserDetails();
  }

  getUsernameInputStyles() {
    return {
      "valid": !this.validateUsername(),
      "invalid": !!this.validateUsername(),
      "validate": true
    }
  }

  getEmailInputStyles() {
    return {
      "valid": !this.validateEmail(),
      "invalid": !!this.validateEmail(),
      "validate": true
    }
  }

  getPasswordInputStyles() {
    return {
      "valid": !this.validatePassword(),
      "invalid": !!this.validatePassword(),
      "validate": true
    }
  }

  getButtonStyles() {
    return {
      "disabled": !this.isUserDetailsValid(),
      "btn-large": true,
      "waves-effect": true,
      "waves-light" : true
    }
  }

  setErrorMessage(error) {
    if(error.target == 'username') {
      this.userNameError = error.message;
    } else if(error.target == 'email') {
      this.emailError = error.message;
    } else if(error.target == 'password') {
      this.passwordError = error.message;
    } else {
      console.error(error);
    }
  }

}