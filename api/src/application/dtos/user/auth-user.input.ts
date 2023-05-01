import { IsEmail, IsNotEmpty } from 'class-validator'

export class AuthUserInput {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string

  constructor(props: AuthUserInput) {
    this.email = props.email
    this.password = props.password
  }
}
