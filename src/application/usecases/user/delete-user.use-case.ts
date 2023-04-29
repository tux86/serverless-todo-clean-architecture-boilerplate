import { DeleteUserInput } from '@/application/dtos/user/delete-user.input'
import { EntityNotFound } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { UserRepository } from '@/domain/repositories/user.repository'

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
