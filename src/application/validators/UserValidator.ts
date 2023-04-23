import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'

import { AuthUserInput } from '@/application/dtos/user/AuthUserInput'
import { RegisterUserInput } from '@/application/dtos/user/RegisterUserInput'
import { InvalidInputError } from '@/application/errors'
import { formatValidationErrors } from '@/application/utlis/formatValidationErrors'

export class UserValidator {
  async validateRegisterUserInput (input: RegisterUserInput): Promise<void> {
    const transformedInput = plainToClass(RegisterUserInput, input)
    const errors: ValidationError[] = await validate(transformedInput)

    if (errors.length > 0) {
      throw new InvalidInputError(formatValidationErrors(errors))
    }
  }

  async validateAuthUserInput (input: AuthUserInput): Promise<void> {
    const transformedInput = plainToClass(AuthUserInput, input)
    const errors: ValidationError[] = await validate(transformedInput)

    if (errors.length > 0) {
      throw new InvalidInputError(formatValidationErrors(errors))
    }
  }
}
