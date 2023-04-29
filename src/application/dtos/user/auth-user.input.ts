import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthUserInput {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string

  constructor(props: AuthUserInput) {
    this.email = props.email
    this.password = props.password
  }
}
