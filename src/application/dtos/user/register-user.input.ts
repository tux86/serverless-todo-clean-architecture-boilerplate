import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterUserInput {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName: string

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  password: string

  constructor(props: RegisterUserInput) {
    this.firstName = props.firstName
    this.lastName = props.lastName
    this.email = this.canonicalizeEmail(props.email)
    this.password = props.password
  }

  private canonicalizeEmail(email: string): string {
    const lowerCaseEmail = email.toLowerCase().trim()
    const [user, domain] = lowerCaseEmail.split('@')
    const canonicalUser = user.split('+')[0].replace(/\./g, '')
    const canonicalDomain = domain.split('.').reverse().join('.')
    return `${canonicalUser}@${canonicalDomain}`
  }
}
