import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthenticateUserInput {
    @IsEmail()
      email: string

    @IsNotEmpty()
      password: string
}
