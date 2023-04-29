import { RegisterUserInput } from '@/application/dtos/user/register-user.input'
import { UseCase } from '@/application/usecases/use-case'
import { UserValidator } from '@/application/validators/user.validator'
import { User } from '@/domain/models/user'
import { AuthService } from '@/domain/services/auth.service'
import { uuidV4 } from '@/shared/helpers/uuid'

export class RegisterUserUseCase implements UseCase<RegisterUserInput, User> {
  constructor(private readonly authService: AuthService, private readonly validator: UserValidator) {}

  async execute(input: RegisterUserInput): Promise<User> {
    this.validator.validateAndThrow(RegisterUserInput, input)
    const user = new User({
      userId: uuidV4(),
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email
    })

    return await this.authService.registerUser(user, input.password)
  }
}
