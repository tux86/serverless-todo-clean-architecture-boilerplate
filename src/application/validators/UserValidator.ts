import { validate, ValidationError } from 'class-validator'

import { AuthenticateUserInput } from '@/application/dtos/user/AuthenticateUserInput'
import { CreateUserInput } from '@/application/dtos/user/CreateUserInput'
import { InvalidInputError } from '@/application/errors'

export class UserValidator {
  async validateCreateTodoInput (input: CreateUserInput): Promise<void> {
    const errors: ValidationError[] = await validate(input)

    if (errors.length > 0) {
      throw new InvalidInputError('Validation failed.')
    }
  }

  async validateAuthenticateUserInput (input: AuthenticateUserInput): Promise<void> {
    const errors: ValidationError[] = await validate(input)

    if (errors.length > 0) {
      throw new InvalidInputError('Validation failed.') // You can customize the error handling based on your requirements.
    }
  }
}
