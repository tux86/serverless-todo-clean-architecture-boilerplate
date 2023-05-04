import { uuidV4 } from '@/common/uuid'

import { User } from '@/api/domain/models/user'
import { AuthService } from '@/api/domain/services/auth.service'

import { RegisterUserInput } from '../../dtos/user/register-user.input'
import { UserValidator } from '../../validators/user.validator'
import { UseCase } from '../use-case'

export class RegisterUserUseCase implements UseCase<RegisterUserInput, User> {
  constructor(private readonly authService: AuthService, private readonly validator: UserValidator) {}

  async execute(input: RegisterUserInput): Promise<User> {
    this.validator.validateAndThrow(RegisterUserInput, input)
    const user = new User({
      userId: uuidV4(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      role: 'user',
      createdAt: new Date()
    })
    return await this.authService.registerUser(user, input.password)
  }
}
