import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { AuthUserInput } from '@/application/dtos/user/auth-user-input'
import { Controller } from '@/application/interfaces/controller'
import { Request } from '@/application/interfaces/request'
import { Response } from '@/application/interfaces/response'
import { AuthenticateUser } from '@/application/usecases/user/authenticate-user'
import { SuccessResponse } from '@/presentation/utils/response'

export class AuthenticateUserController implements Controller<AuthSuccessResult | never> {
  constructor(readonly authenticateUser: AuthenticateUser) {}

  async handleRequest(request: Request<AuthUserInput>): Promise<Response<AuthSuccessResult>> {
    const input = request.body
    const authSuccessResult = await this.authenticateUser.execute(input)
    return new SuccessResponse(authSuccessResult)
  }
}
