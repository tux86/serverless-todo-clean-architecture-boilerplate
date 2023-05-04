import { ListUsersInput } from '@/api/application/dtos/user/list-users.input'
import { UserForbiddenError } from '@/api/application/errors'
import { UserValidator } from '@/api/application/validators/user.validator'
import { User } from '@/api/domain/models/user'
import { UserRepository } from '@/api/domain/repositories/user.repository'

import { UseCase } from '../use-case'

export class ListUsersUseCase implements UseCase<ListUsersInput, User[]> {
  constructor(private readonly userRepository: UserRepository, private readonly validator: UserValidator) {}

  async execute(input: ListUsersInput): Promise<User[]> {
    this.validator.validateAndThrow(ListUsersInput, input)
    if (input.requestingUserRole !== 'admin') {
      throw new UserForbiddenError()
    }
    return await this.userRepository.findAll()
  }
}
