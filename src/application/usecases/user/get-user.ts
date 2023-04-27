import { EntityNotFound } from '@/application/errors'
import { UseCase } from '@/application/usecases/use-case'
import { User } from '@/domain/models/user'
import { UserSecurityService } from '@/domain/services/user-security-service'

export class GetUser implements UseCase<string, User> {
  constructor(private userService: UserSecurityService) {}

  async execute(email: string): Promise<User | never> {
    const user = await this.userService.authenticateUser('', '')
    if (!user) {
      throw new EntityNotFound(User.name, email)
    }
    return new User('', '', '')
  }
}
