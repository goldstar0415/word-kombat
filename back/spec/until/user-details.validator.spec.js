const userDetailsValidator = require('../../util/user-details.validator');

const INVALID_USERNAME = {
  target: "username",
  message: "Username is invalid"
};

const INVALID_EMAIL = {
  target: "email",
  message: "Email is invalid"
};

const INVALID_PASSWORD = {
  target: "password",
  message: "Password is invalid"
};

describe("User Details Validator", () => {

  it("should return an error message if username is null", () => {
    expect(userDetailsValidator.validateUsername(null)).toEqual(INVALID_USERNAME);
  });

  it("should return an error message if username is empty or contains only space characters", () => {
    expect(userDetailsValidator.validateUsername("")).toEqual(INVALID_USERNAME);
    expect(userDetailsValidator.validateUsername("   ")).toEqual(INVALID_USERNAME);
    expect(userDetailsValidator.validateUsername("\t")).toEqual(INVALID_USERNAME);
    expect(userDetailsValidator.validateUsername("\n")).toEqual(INVALID_USERNAME);
  });

  it("should return an error message if username is too short", () => {
    expect(userDetailsValidator.validateUsername("aaa")).toEqual(INVALID_USERNAME);
  });

  it("should return an error message if username is too long", () => {
    expect(userDetailsValidator.validateUsername("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))
      .toEqual(INVALID_USERNAME);
  });

  it("should return an error message if username contains non-word characters", () => {
    expect(userDetailsValidator.validateUsername("*asdfasfd")).toEqual(INVALID_USERNAME);
    expect(userDetailsValidator.validateUsername("&&&&")).toEqual(INVALID_USERNAME);
  });

  it("should return undefined if username is correct", () => {
    expect(userDetailsValidator.validateUsername("username")).toEqual(undefined);
    expect(userDetailsValidator.validateUsername("name")).toEqual(undefined);
    expect(userDetailsValidator.validateUsername("namennnnnanameameameameameamea")).toEqual(undefined);
    expect(userDetailsValidator.validateUsername("name1")).toEqual(undefined);
    expect(userDetailsValidator.validateUsername("1111")).toEqual(undefined);
  });

  it("should return an error message if email is null", () => {
    expect(userDetailsValidator.validateEmail(null)).toEqual(INVALID_EMAIL);
  });

  it("should return an error message if email is empty or contains only space characters", () => {
    expect(userDetailsValidator.validateEmail("")).toEqual(INVALID_EMAIL);
    expect(userDetailsValidator.validateEmail("   ")).toEqual(INVALID_EMAIL);
    expect(userDetailsValidator.validateEmail("\t")).toEqual(INVALID_EMAIL);
    expect(userDetailsValidator.validateEmail("\n")).toEqual(INVALID_EMAIL);
  });

  it("should return an error message if email format is incorrect", () => {
    const INVALID_EMAILS = [
      "plainaddress",
      "#@%^%#$@#$@#.com",
      "@example.com",
      "Joe Smith <email@example.com>",
      "email.example.com",
      "email@example@example.com",
      ".email@example.com",
      "email.@example.com",
      "email@example.com (Joe Smith)",
      "email@example",
      "email@111.222.333.44444"
    ];

    INVALID_EMAILS.forEach(invalidEmail => {
      expect(userDetailsValidator.validateEmail(invalidEmail)).toEqual(INVALID_EMAIL);
    });

  });

  it("should return undefined if email format is correct", () => {
    const VALID_EMAILS = [
      "email@example.com",
      "firstname.lastname@example.com",
      "email@subdomain.example.com",
      "firstname+lastname@example.com",
      "1234567890@example.com",
      "email@example-one.com",
      "_______@example.com",
      "email@example.name",
      "email@example.museum",
      "email@example.co.jp",
      "firstname-lastname@example.com"
    ];

    VALID_EMAILS.forEach(validEmail => {
      expect(userDetailsValidator.validateEmail(validEmail)).toEqual(undefined);
    });
  });

  it("should return an error message if password is null", () => {
    expect(userDetailsValidator.validatePassword(null)).toEqual(INVALID_PASSWORD);
  });

  it("should return an error message if password is empty or contains only space characters", () => {
    expect(userDetailsValidator.validatePassword("")).toEqual(INVALID_PASSWORD);
    expect(userDetailsValidator.validatePassword("   ")).toEqual(INVALID_PASSWORD);
    expect(userDetailsValidator.validatePassword("\t")).toEqual(INVALID_PASSWORD);
    expect(userDetailsValidator.validatePassword("\n")).toEqual(INVALID_PASSWORD);
  });

  it("should return an error message if password is too short", () => {
    expect(userDetailsValidator.validatePassword("aaaaa")).toEqual(INVALID_PASSWORD);
  });

  it("should return an error message if password is too long", () => {
    expect(userDetailsValidator.validatePassword("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))
      .toEqual(INVALID_PASSWORD);
  });

  it("should return undefined if password format is correct", () => {
    expect(userDetailsValidator.validatePassword("password")).toEqual(undefined);
    expect(userDetailsValidator.validatePassword("111111")).toEqual(undefined);
    expect(userDetailsValidator.validatePassword("111111111111111111111111111111")).toEqual(undefined);
  });


});

