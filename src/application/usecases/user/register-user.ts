import { inject, injectable } from 'inversify'

import { RegisterUserInput } from '@/application/dtos/user/register-user-input'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { TYPES } from '@/common/ioc/types'
import { User } from '@/domain/models/user'
import { AuthService } from '@/domain/services/auth-service'

@injectable()
export class RegisterUser implements UseCase<RegisterUserInput, User> {
  constructor(
    @inject(TYPES.AuthServiceImpl) private readonly authService: AuthService,
    @inject(TYPES.UserValidator) private readonly validator: UserValidator
  ) {}

  async execute(input: RegisterUserInput): Promise<User> {
    await this.validator.validateRegisterUserInput(input)
    const user = new User(input.firstName, input.lastName, input.email)
    return await this.authService.registerUser(user, input.password)
  }
}
