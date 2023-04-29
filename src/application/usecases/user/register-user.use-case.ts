import { inject, injectable } from 'inversify'

import { RegisterUserInput } from '@/application/dtos/user/register-user.input'
import { UseCase } from '@/application/usecases/use-case'
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
    this.validator.validateAndThrow(RegisterUserInput, input)
    const user = new User(input.firstName, input.lastName, input.email)
    return await this.authService.registerUser(user, input.password)
  }
}
