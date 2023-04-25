import { EntityNotFound } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { User } from '@/domain/models/user'
import { UserService } from '@/domain/services/user-service'

export class GetUser implements UseCase<string, User> {
  constructor(private userService: UserService) {}

  async execute(email: string): Promise<User | never> {
    const user = await this.userService.findUserByEmail(email)
    if (!user) {
      throw new EntityNotFound(User.name, email)
    }
    return user
  }
}
