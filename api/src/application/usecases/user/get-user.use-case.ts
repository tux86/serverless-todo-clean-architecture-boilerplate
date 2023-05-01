import { User } from '@/api/domain/models/user'
import { UserRepository } from '@/api/domain/repositories/user.repository'

import { GetUserInput } from '../../dtos/user/get-user.input'
import { EntityNotFound } from '../../errors'
import { UserValidator } from '../../validators/user.validator'
import { UseCase } from '../use-case'

export class GetUserUseCase implements UseCase<GetUserInput, User> {
  constructor(private readonly userRepository: UserRepository, private readonly validator: UserValidator) {}

  async execute(input: GetUserInput): Promise<User | never> {
    this.validator.validateAndThrow(GetUserInput, input)
    const user = await this.userRepository.findById(input.userId)
    if (!user) {
      throw new EntityNotFound('User', input.userId)
    }
    return user
  }
}
