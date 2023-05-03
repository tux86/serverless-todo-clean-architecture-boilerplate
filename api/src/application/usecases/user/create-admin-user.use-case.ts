import { uuidV4 } from '@/common/uuid'

import { CreateAdminUserInput } from '@/api/application/dtos/user/create-admin-user.input'
import { User } from '@/api/domain/models/user'
import { AuthService } from '@/api/domain/services/auth.service'

import { RegisterUserInput } from '../../dtos/user/register-user.input'
import { UserValidator } from '../../validators/user.validator'
import { UseCase } from '../use-case'

export class CreateAdminUserUseCase implements UseCase<RegisterUserInput, User> {
  constructor(private readonly authService: AuthService, private readonly validator: UserValidator) {}

  async execute(input: CreateAdminUserInput): Promise<User> {
    this.validator.validateAndThrow(CreateAdminUserInput, input)
    const user: User = {
      userId: uuidV4(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      role: 'admin',
      createdAt: new Date()
    }
    return await this.authService.registerUser(user, input.password)
  }
}
