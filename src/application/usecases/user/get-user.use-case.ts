import { GetUserInput } from '@/application/dtos/user/get-user.input'
import { EntityNotFound } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { User } from '@/domain/models/user'
import { UserRepository } from '@/domain/repositories/user.repository'

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
