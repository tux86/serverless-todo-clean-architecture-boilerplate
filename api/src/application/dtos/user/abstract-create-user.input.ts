import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export abstract class AbstractCreateUserInput {
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
}
