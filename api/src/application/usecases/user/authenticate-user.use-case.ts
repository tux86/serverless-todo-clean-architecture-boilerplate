import { AuthService } from '@/api/domain/services/auth.service'

import { AuthSuccessResult } from '../../dtos/user/auth-success.result'
import { AuthUserInput } from '../../dtos/user/auth-user.input'
import { AuthFailedError } from '../../errors'
import { UserValidator } from '../../validators/user.validator'
import { UseCase } from '../use-case'

export class AuthenticateUserUseCase implements UseCase<AuthUserInput, AuthSuccessResult | never> {
  constructor(private readonly authService: AuthService, private readonly validator: UserValidator) {}

  async execute(input: AuthUserInput): Promise<AuthSuccessResult | never> {
    this.validator.validateAndThrow(AuthUserInput, input)

    try {
      return await this.authService.authenticateUser(input.email, input.password)
    } catch (error: any) {
      throw new AuthFailedError(error.message)
    }
  }
}
