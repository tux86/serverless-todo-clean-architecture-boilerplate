import { AuthSuccessResult } from '@/application/dtos/user/AuthSuccessResult'
import { AuthUserInput } from '@/application/dtos/user/AuthUserInput'
import { UserValidator } from '@/application/validators/UserValidator'
import { AuthFailedError } from '@/domain/errors'
import { UseCase } from '@/domain/interfaces/UseCase'
import { UserService } from '@/domain/services/UserService'

export class AuthenticateUserUseCase implements UseCase<AuthUserInput, AuthSuccessResult | never> {
  constructor(private userService: UserService, private validator: UserValidator) {}

  async execute(input: AuthUserInput): Promise<AuthSuccessResult | never> {
    await this.validator.validateAuthUserInput(input)

    try {
      return await this.userService.authenticateUser(input.email, input.password)
    } catch (error: any) {
      throw new AuthFailedError(error.message)
    }
  }
}
