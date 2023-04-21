import { UserService } from '@/domain/interfaces/UserService'

export class AuthenticateUserUseCase {
  constructor (private userRepository: UserService) {
  }

  async execute (email: string, password: string): Promise<string> {
    return await this.userRepository.authenticateUser(email, password)
  }
}
