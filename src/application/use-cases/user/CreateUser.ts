import { User } from '@/domain/entities/User'
import { UserService } from '@/domain/interfaces/UserService'

export class CreateUser {
  constructor (private userRepository: UserService) {
  }

  async execute (email: string, password: string): Promise<User> {
    const user = new User(email, password)
    return await this.userRepository.createUser(user)
  }
}
