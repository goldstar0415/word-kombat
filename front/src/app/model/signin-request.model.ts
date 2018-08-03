export class SignInRequest {

  constructor(
    public name: string="",
    public password: string=""
  ) {}

  toString(): string {
    return JSON.stringify(this)
  }
}
