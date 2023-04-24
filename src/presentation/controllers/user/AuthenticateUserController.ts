import { AuthSuccessResult } from '@/application/dtos/user/AuthSuccessResult'
import { AuthUserInput } from '@/application/dtos/user/AuthUserInput'
import { Controller } from '@/application/interfaces/Controller'
import { Request } from '@/application/interfaces/Request'
import { Response } from '@/application/interfaces/Response'
import { AuthenticateUser } from '@/application/usecases/user/AuthenticateUser'
import { SuccessResponse } from '@/presentation/utils/response'

export class AuthenticateUserController implements Controller<AuthSuccessResult | never> {
  constructor(readonly authenticateUser: AuthenticateUser) {}

  async handleRequest(request: Request<AuthUserInput>): Promise<Response<AuthSuccessResult>> {
    const input = request.body
    const authSuccessResult = await this.authenticateUser.execute(input)
    return new SuccessResponse(authSuccessResult)
  }
}
