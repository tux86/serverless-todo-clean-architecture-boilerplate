import { EntityNotFound } from '@/domain/errors'
import { UserService } from '@/domain/interfaces/services/UserService'
import { UseCase } from '@/domain/interfaces/UseCase'
import { User } from '@/domain/models/User'

export class GetUserUseCase implements UseCase<string, User> {
  constructor (private userService: UserService) {
  }

  async execute (email: string): Promise<User | never> {
    const user = await this.userService.findUserByEmail(email)
    if (!user) {
      throw new EntityNotFound(User.name, email)
    }
    return user
  }
}
