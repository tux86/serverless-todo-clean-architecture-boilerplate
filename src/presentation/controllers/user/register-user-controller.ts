import { RegisterUserInput } from '@/application/dtos/user/register-user-input'
import { Controller } from '@/application/interfaces/controller'
import { Request } from '@/application/interfaces/request'
import { Response } from '@/application/interfaces/response'
import { RegisterUser } from '@/application/usecases/user/register-user'
import { User } from '@/domain/models/user'
import { CreatedResponse } from '@/presentation/utils/response'

export class RegisterUserController implements Controller<User | never> {
  constructor(readonly registerUser: RegisterUser) {}

  async handleRequest(request: Request<RegisterUserInput>): Promise<Response<User>> {
    const input = request.body
    const user = await this.registerUser.execute(input)
    return new CreatedResponse(user)
  }
}
