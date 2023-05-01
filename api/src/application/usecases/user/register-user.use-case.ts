import { User } from '@/api/domain/models/user'
import { AuthService } from '@/api/domain/services/auth.service'
import { uuidV4 } from '@/api/shared/helpers/uuid'

import { RegisterUserInput } from '../../dtos/user/register-user.input'
import { UserValidator } from '../../validators/user.validator'
import { UseCase } from '../use-case'

export class RegisterUserUseCase implements UseCase<RegisterUserInput, User> {
  constructor(private readonly authService: AuthService, private readonly validator: UserValidator) {}

  async execute(input: RegisterUserInput): Promise<User> {
    this.validator.validateAndThrow(RegisterUserInput, input)
    const user: User = {
      userId: uuidV4(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      createdAt: new Date()
    }
    return await this.authService.registerUser(user, input.password)
  }
}
