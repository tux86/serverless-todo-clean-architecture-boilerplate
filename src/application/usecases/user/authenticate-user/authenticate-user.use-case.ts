import { inject, injectable } from 'inversify'

import { AuthFailedError } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { AuthSuccessResult } from '@/application/usecases/user/authenticate-user/auth-success.result'
import { AuthUserInput } from '@/application/usecases/user/authenticate-user/auth-user.input'
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
    await this.validator.validateAuthUserInput(input)

    try {
      return await this.authService.authenticateUser(input.email, input.password)
    } catch (error: any) {
      throw new AuthFailedError(error.message)
    }
  }
}
