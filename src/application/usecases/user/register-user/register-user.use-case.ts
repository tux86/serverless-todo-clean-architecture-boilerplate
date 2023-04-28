import { inject, injectable } from 'inversify'

import { UseCase } from '@/application/usecases/use-case'
import { RegisterUserInput } from '@/application/usecases/user/register-user/register-user.input'
import { UserValidator } from '@/application/validators/user.validator'
import { User } from '@/domain/models/user'
import { AuthService } from '@/domain/services/auth.service'
import { AuthServiceImpl } from '@/infrastructure/services/auth-service.impl'

@injectable()
export class RegisterUserUseCase implements UseCase<RegisterUserInput, User> {
  constructor(
    @inject(AuthServiceImpl) private readonly authService: AuthService,
    @inject(UserValidator) private readonly validator: UserValidator
  ) {}

  async execute(input: RegisterUserInput): Promise<User> {
    await this.validator.validateRegisterUserInput(input)
    const user = new User(input.firstName, input.lastName, input.email)
    return await this.authService.registerUser(user, input.password)
  }
}
