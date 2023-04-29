import { inject, injectable } from 'inversify'

import { DeleteUserInput } from '@/application/dtos/user/delete-user.input'
import { EntityNotFound } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { TYPES } from '@/common/ioc'
import { User } from '@/domain/models/user'
import { UserRepository } from '@/domain/repositories/user.repository'

@injectable()
export class DeleteUserUseCase implements UseCase<DeleteUserInput, void> {
  constructor(
    @inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
    @inject(TYPES.UserValidator) private readonly validator: UserValidator
  ) {}

  async execute(input: DeleteUserInput): Promise<void | never> {
    this.validator.validateAndThrow(DeleteUserInput, input)
    const user = await this.userRepository.findById(input.userId)
    if (!user) {
      throw new EntityNotFound(User.name, input.userId)
    }
    await this.userRepository.delete(input.userId)
  }
}
