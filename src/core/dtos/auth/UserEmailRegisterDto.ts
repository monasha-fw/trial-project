export class UserEmailRegisterDto {
  constructor(public email: string, public password: string, public name: string, public roles: [string]) {}
}
