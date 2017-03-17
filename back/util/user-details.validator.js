class UserDetailsValidator {

  static validateUserDetails(user) {
    let emailValidationResult = UserDetailsValidator.validateEmail(user.email);
    let usernameValidationResult = UserDetailsValidator.validateUsername(user.name);
    let passwordValidationResult = UserDetailsValidator.validatePassword(user.password);

    if(emailValidationResult) return emailValidationResult;
    if(usernameValidationResult) return usernameValidationResult;
    if(passwordValidationResult) return passwordValidationResult;
  }

  static validateEmail(email) {
    const VALID_EMAIL_REGEX = /^\w{1}[+\w._-]+\w{1}@[\w.-]+\.[a-zA-Z]{2,}$/i;
    let isEmailValid = !!email && !!email.trim() && VALID_EMAIL_REGEX.test(email);

    if(!isEmailValid) {
      return {
        target: "email",
        message: "Email is invalid"
      };
    }
  }

  static validateUsername(username) {
    const VALID_USERNAME_REGEX = /^\w{4,30}$/;
    let isUsernameValid = !!username && !!username.trim() 
      && VALID_USERNAME_REGEX.test(username);

    if(!isUsernameValid) {
      return {
        target: "username",
        message: "Username is invalid"
      };
    }
  }

  static validatePassword(password) {
    const VALID_PASSWORD_REGEX = /^\S{6,30}$/;
    let isPasswordValid = !!password && !!password.trim()
      && VALID_PASSWORD_REGEX.test(password);

    if(!isPasswordValid) {
      return {
        target: "password",
        message: "Password is invalid"
      };
    }
  }

}

module.exports = UserDetailsValidator;