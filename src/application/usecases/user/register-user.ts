import { RegisterUserInput } from '@/application/dtos/user/register-user-input'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { User } from '@/domain/models/user'
import { UserService } from '@/domain/services/user-service'

export class RegisterUser implements UseCase<RegisterUserInput, User> {
  constructor(private userService: UserService, private validator: UserValidator) {}

  async execute(input: RegisterUserInput): Promise<User> {
    await this.validator.validateRegisterUserInput(input)
    const user = new User(input.firstName, input.lastName, input.email)
    return await this.userService.registerUser(user, input.password)
  }
}
