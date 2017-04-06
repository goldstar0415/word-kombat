import {
  Component,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';

import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'wk-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() user;
  @ViewChild('close') close: ElementRef;

  userNameError: string;
  emailError: string;
  passwordError: string;
  file: File;

  constructor(private userService: UserService) {
    this.user = new User();
    this.file = null;
  }

  update() {
    this.userService.update(this.user.id, this.user)
      .subscribe(user => this.user.password = "", this.setErrorMessage);
  }

  upload() {
    if(this.file) {
      this.userService.uploadImage(this.user.id, this.user.icon)
        .subscribe(res => {
          this.close.nativeElement.click();
        }, error => {
          console.error(error);
        })
    }
  }

  fileChange(event) {
    let fileList = event.target.files;
    if(fileList.length > 0) {
      this.file = fileList[0];
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.icon = e.target.result;
      };
      reader.readAsDataURL(fileList[0]);
    }
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

  isFileValid(): boolean {
    return !!this.file;
  }

  getUploadButtonStyles() {
    return {
      "disabled": !this.isFileValid(),
      "btn-large": true,
      "waves-effect": true,
      "waves-light": true
    }
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

  getUpdateButtonStyles() {
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
