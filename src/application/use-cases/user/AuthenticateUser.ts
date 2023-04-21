import { UserService } from '../../../domain/interfaces/UserService'

export class AuthenticateUser {
  constructor (private userRepository: UserService) {}

  async execute (email: string, password: string): Promise<string> {
    return await this.userRepository.authenticateUser(email, password)
  }
}
