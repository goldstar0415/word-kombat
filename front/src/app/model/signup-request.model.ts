import {SignInRequest} from './signin-request.model';

export class SignUpRequest extends SignInRequest {

  constructor(public username: string = '',
              public email: string = '',
              public password: string = '') {
    super();
  }

}
