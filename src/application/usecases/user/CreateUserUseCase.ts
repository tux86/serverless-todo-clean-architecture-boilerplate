
import { CreateUserInput } from '@/application/dtos/user/CreateUserInput'
import { User } from '@/domain/entities/User'
import { UseCase } from '@/domain/interfaces/UseCase'
import { UserService } from '@/domain/services/UserService'

export class CreateUserUseCase implements UseCase<CreateUserInput, User> {
  constructor (private userService: UserService) {
  }

  async execute (input: CreateUserInput): Promise<User> {
    const user = new User(input.email, input.password)
    return await this.userService.createUser(user)
  }
}
