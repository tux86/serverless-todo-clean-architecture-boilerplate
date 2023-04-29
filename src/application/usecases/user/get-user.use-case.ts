import { inject, injectable } from 'inversify'

import { GetUserInput } from '@/application/dtos/user/get-user.input'
import { EntityNotFound } from '@/application/errors/validation.error'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { User } from '@/domain/models/user'
import { DynamodbUserRepository } from '@/infrastructure/repositories/dynamodb.user.repository'

@injectable()
export class GetUserUseCase implements UseCase<GetUserInput, User> {
  constructor(
    @inject(DynamodbUserRepository) private readonly userRepository: DynamodbUserRepository,
    @inject(UserValidator) private readonly validator: UserValidator
  ) {}

  async execute(input: GetUserInput): Promise<User | never> {
    this.validator.validateAndThrow(GetUserInput, input)
    const user = await this.userRepository.findById(input.userId)
    if (!user) {
      throw new EntityNotFound(User.name, input.userId)
    }
    return user
  }
}
