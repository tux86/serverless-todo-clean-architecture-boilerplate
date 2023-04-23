import { AuthenticateUserInput } from '@/application/dtos/user/AuthenticateUserInput'
import { UserValidator } from '@/application/validators/UserValidator'
import { UseCase } from '@/domain/interfaces/UseCase'
import { UserService } from '@/domain/services/UserService'

export class AuthenticateUserUseCase implements UseCase<AuthenticateUserInput, string> {
  constructor (private userService: UserService, private validator: UserValidator) {
  }

  async execute (input: AuthenticateUserInput): Promise<string> {
    await this.validator.validateAuthenticateUserInput(input)
    return await this.userService.authenticateUser(input.email, input.password)
  }
}
