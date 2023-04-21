import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class User {
    @IsEmail()
  public email: string

    @IsNotEmpty()
    @MinLength(8)
    public password: string

    constructor (email: string, password: string) {
      this.email = email
      this.password = password
    }
}
