import { UserRepository } from '@/api/domain/repositories/user.repository'

import { DeleteUserInput } from '../../dtos/user/delete-user.input'
import { EntityNotFound } from '../../errors'
import { UserValidator } from '../../validators/user.validator'
import { UseCase } from '../use-case'

export class DeleteUserUseCase implements UseCase<DeleteUserInput, void> {
  constructor(private readonly userRepository: UserRepository, private readonly validator: UserValidator) {}

  async execute(input: DeleteUserInput): Promise<void | never> {
    this.validator.validateAndThrow(DeleteUserInput, input)
    const user = await this.userRepository.findById(input.userId)
    if (!user) {
      throw new EntityNotFound('User', input.userId)
    }
    await this.userRepository.delete(input.userId)
  }
}
