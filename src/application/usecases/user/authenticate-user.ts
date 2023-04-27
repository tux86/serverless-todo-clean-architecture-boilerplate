import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { AuthUserInput } from '@/application/dtos/user/auth-user-input'
import { AuthFailedError } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { UserSecurityService } from '@/domain/services/user-security-service'

export class AuthenticateUser implements UseCase<AuthUserInput, AuthSuccessResult | never> {
  constructor(private userService: UserSecurityService, private validator: UserValidator) {}

  async execute(input: AuthUserInput): Promise<AuthSuccessResult | never> {
    await this.validator.validateAuthUserInput(input)

    try {
      return await this.userService.authenticateUser(input.email, input.password)
    } catch (error: any) {
      throw new AuthFailedError(error.message)
    }
  }
}
