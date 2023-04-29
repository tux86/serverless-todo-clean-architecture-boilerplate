import { inject, injectable } from 'inversify'

import { AuthSuccessResult } from '@/application/dtos/user/auth-success.result'
import { AuthUserInput } from '@/application/dtos/user/auth-user.input'
import { AuthFailedError } from '@/application/errors/validation.error'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { AuthService } from '@/domain/services/auth.service'
import { AuthServiceImpl } from '@/infrastructure/services/auth-service.impl'

@injectable()
export class AuthenticateUserUseCase implements UseCase<AuthUserInput, AuthSuccessResult | never> {
  constructor(
    @inject(AuthServiceImpl) private readonly authService: AuthService,
    @inject(UserValidator) private readonly validator: UserValidator
  ) {}

  async execute(input: AuthUserInput): Promise<AuthSuccessResult | never> {
    this.validator.validateAndThrow(AuthUserInput, input)

    try {
      return await this.authService.authenticateUser(input.email, input.password)
    } catch (error: any) {
      throw new AuthFailedError(error.message)
    }
  }
}
