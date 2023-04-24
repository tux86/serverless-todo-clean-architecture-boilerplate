import { RegisterUserInput } from '@/application/dtos/user/RegisterUserInput'
import { Controller } from '@/application/interfaces/Controller'
import { Request } from '@/application/interfaces/Request'
import { Response } from '@/application/interfaces/Response'
import { RegisterUser } from '@/application/usecases/user/RegisterUser'
import { User } from '@/domain/models/User'
import { CreatedResponse } from '@/presentation/utils/response'

export class RegisterUserController implements Controller<User | never> {
  constructor(readonly registerUser: RegisterUser) {}

  async handleRequest(request: Request<RegisterUserInput>): Promise<Response<User>> {
    const input = request.body
    const user = await this.registerUser.execute(input)
    return new CreatedResponse(user)
  }
}
