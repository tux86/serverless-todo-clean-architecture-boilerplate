import { inject, injectable } from 'inversify'

import { EntityNotFound } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { User } from '@/domain/models/user'
import { UserRepository } from '@/domain/repositories/user-repository'
import { TYPES } from '@/ioc/types'

@injectable()
export class DeleteUser implements UseCase<string, void> {
  constructor(@inject(TYPES.UserDynamodbRepository) private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void | never> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new EntityNotFound(User.name, userId)
    }
    await this.userRepository.delete(userId)
  }
}
