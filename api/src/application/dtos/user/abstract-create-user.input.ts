import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export abstract class AbstractCreateUserInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly firstName: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly lastName: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  readonly password: string

  protected constructor(props: AbstractCreateUserInput) {
    this.firstName = props.firstName.trim()
    this.lastName = props.lastName.trim()
    this.email = this.canonicalizeEmail(props.email)
    this.password = props.password
  }

  protected canonicalizeEmail(email: string): string {
    return email.trim().toLowerCase()
  }
}
