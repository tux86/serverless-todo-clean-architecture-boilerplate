import { User } from '@/domain/entities/User'
import { UserService } from '@/domain/interfaces/UserService'

export class GetUser {
  constructor (private userRepository: UserService) {
  }

  async execute (email: string): Promise<User | null> {
    return await this.userRepository.findUserByEmail(email)
  }
}
