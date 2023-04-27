import { inject, injectable } from 'inversify'

import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { AuthUserInput } from '@/application/dtos/user/auth-user-input'
import { AuthFailedError } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { AuthService } from '@/domain/services/auth-service'
import { TYPES } from '@/ioc/types'

@injectable()
export class AuthenticateUser implements UseCase<AuthUserInput, AuthSuccessResult | never> {
  constructor(
    @inject(TYPES.AuthServiceImpl) private readonly authService: AuthService,
    @inject(TYPES.UserValidator) private readonly validator: UserValidator
  ) {}

  async execute(input: AuthUserInput): Promise<AuthSuccessResult | never> {
    await this.validator.validateAuthUserInput(input)

    try {
      return await this.authService.authenticateUser(input.email, input.password)
    } catch (error: any) {
      throw new AuthFailedError(error.message)
    }
  }
}
