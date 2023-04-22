
import { CreateUserInput } from '@/application/dtos/user/CreateUserInput'
import { UserService } from '@/domain/interfaces/services/UserService'
import { UseCase } from '@/domain/interfaces/UseCase'
import { User } from '@/domain/models/User'

export class CreateUserUseCase implements UseCase<CreateUserInput, User> {
  constructor (private userService: UserService) {
  }

  async execute (input: CreateUserInput): Promise<User> {
    const user = new User(input.email, input.password)
    return await this.userService.createUser(user)
  }
}
