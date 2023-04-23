import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthUserInput {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
