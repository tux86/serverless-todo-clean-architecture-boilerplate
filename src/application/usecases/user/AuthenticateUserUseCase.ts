import { UserService } from '@/domain/interfaces/UserService'

export class AuthenticateUserUseCase {
  constructor (private userService: UserService) {
  }

  async execute (email: string, password: string): Promise<string> {
    return await this.userService.authenticateUser(email, password)
  }
}
