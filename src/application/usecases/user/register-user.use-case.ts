import * as console from 'console'

import { inject, injectable } from 'inversify'

import { RegisterUserInput } from '@/application/dtos/user/register-user.input'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { TYPES } from '@/common/ioc'
import { User } from '@/domain/models/user'
import { AuthService } from '@/domain/services/auth.service'

@injectable()
export class RegisterUserUseCase implements UseCase<RegisterUserInput, User> {
  constructor(
    @inject(TYPES.AuthService) private readonly authService: AuthService,
    @inject(TYPES.UserValidator) private readonly validator: UserValidator
  ) {}

  async execute(input: RegisterUserInput): Promise<User> {
    this.validator.validateAndThrow(RegisterUserInput, input)
    const user = new User(input.firstName, input.lastName, input.email)
    try {
      return await this.authService.registerUser(user, input.password)
    } catch (error) {
      console.error(error.name === 'UsernameExistsException')
    }
  }
}
