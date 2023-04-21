import { User } from '@/domain/entities/User'
import { UserService } from '@/domain/interfaces/UserService'

export class GetUserUseCase {
  constructor (private userService: UserService) {
  }

  async execute (email: string): Promise<User | null> {
    return await this.userService.findUserByEmail(email)
  }
}
