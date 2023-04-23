
import { RegisterUserInput } from '@/application/dtos/user/RegisterUserInput'
import { UserValidator } from '@/application/validators/UserValidator'
import { User } from '@/domain/entities/User'
import { UseCase } from '@/domain/interfaces/UseCase'
import { UserService } from '@/domain/services/UserService'

export class RegisterUserUseCase implements UseCase<RegisterUserInput, User> {
  constructor (
      private userService: UserService,
      private validator: UserValidator
  ) {}

  async execute (input: RegisterUserInput): Promise<User> {
    await this.validator.validateRegisterUserInput(input)
    const user = new User(input.firstName, input.lastName, input.email)
    return await this.userService.registerUser(user, input.password)
  }
}
