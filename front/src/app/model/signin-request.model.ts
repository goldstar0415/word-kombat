export class SignInRequest {

  constructor(
    public email: string="",
    public password: string=""
  ) {}

  toString(): string {
    return JSON.stringify(this)
  }
}