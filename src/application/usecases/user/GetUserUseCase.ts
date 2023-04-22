import { UserService } from '@/domain/interfaces/services/UserService'
import { UseCase } from '@/domain/interfaces/UseCase'
import { User } from '@/domain/models/User'

export class GetUserUseCase implements UseCase<string, User> {
  constructor (private userService: UserService) {
  }

  async execute (email: string): Promise<User | null> {
    return await this.userService.findUserByEmail(email)
  }
}
