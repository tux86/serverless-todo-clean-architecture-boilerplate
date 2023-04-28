import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { injectable } from 'inversify'

import { InvalidInputError } from '@/application/errors'
import { AuthUserInput } from '@/application/usecases/user/authenticate-user/auth-user.input'
import { RegisterUserInput } from '@/application/usecases/user/register-user/register-user.input'
import { formatValidationErrors } from '@/application/utlis/format-validation-errors'

@injectable()
export class UserValidator {
  async validateRegisterUserInput(input: RegisterUserInput): Promise<void> {
    const transformedInput = plainToClass(RegisterUserInput, input)
    const errors: ValidationError[] = await validate(transformedInput)

    if (errors.length > 0) {
      throw new InvalidInputError(formatValidationErrors(errors))
    }
  }

  async validateAuthUserInput(input: AuthUserInput): Promise<void> {
    const transformedInput = plainToClass(AuthUserInput, input)
    const errors: ValidationError[] = await validate(transformedInput)

    if (errors.length > 0) {
      throw new InvalidInputError(formatValidationErrors(errors))
    }
  }
}
