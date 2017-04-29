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
  @ViewChild('usernameInput') usernameInput;
  @ViewChild('emailInput') emailInput;
  @ViewChild('passwordInput') passwordInput;

  submitButtonText: string;
  usernameErrorMessage: string;
  emailErrorMessage: string;
  passwordErrorMessage: string;
  file: File;

  constructor(private userService: UserService) {
    this.user = new User();
    this.file = null;
    this.usernameErrorMessage = "Username format is invalid";
    this.emailErrorMessage = "Email format is invalid";
    this.passwordErrorMessage = "Password format is invalid";
    this.submitButtonText = "SAVE";
  }

  onUserDetailsSubmit(): void {
    this.userService.update(this.user.id, this.user)
      .subscribe(user => {
        this.submitButtonText = "UPDATED";
        window.setTimeout(() => {
          this.submitButtonText = "SAVE";
        }, 3000);
      }, error => {
        console.error(error)
      });
  }

  onImageUploadSubmit(): void {
    if(this.file) {
      this.userService.uploadImage(this.user.id, this.user.icon)
        .subscribe(res => {
          this.close.nativeElement.click();
        }, error => {
          console.error(error);
        })
    }
  }

  onFileChange(event): void {
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

  isFileValid(): boolean {
    return Boolean(this.file);
  }

  usernameValidity() {
    return this.checkValidity(this.usernameInput);
  }

  emailValidity() {
    return this.checkValidity(this.emailInput);
  }

  passwordValidity() {
    return this.checkValidity(this.passwordInput);
  }

  private checkValidity(inputElement) {
    return {
      'invalid': inputElement.dirty && inputElement.invalid,
      'valid': inputElement.dirty && inputElement.valid
    };
  }

}
