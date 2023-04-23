import { User } from '@/domain/entities/User'
import { EntityNotFound } from '@/domain/errors'
import { UseCase } from '@/domain/interfaces/UseCase'
import { UserService } from '@/domain/services/UserService'

export class GetUserUseCase implements UseCase<string, User> {
  constructor(private userService: UserService) {}

  async execute(email: string): Promise<User | never> {
    const user = await this.userService.findUserByEmail(email)
    if (!user) {
      throw new EntityNotFound(User.name, email)
    }
    return user
  }
}
