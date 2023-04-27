import { EntityNotFound } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { User } from '@/domain/models/user'
import { UserRepository } from '@/domain/repositories/user-repository'

export class DeleteUser implements UseCase<string, void> {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<void | never> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new EntityNotFound(User.name, userId)
    }
    await this.userRepository.delete(userId)
  }
}
