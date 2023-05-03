import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { AuthSuccessResult } from '@/api/application/dtos/user/auth-success.result'
import { AuthUserInput } from '@/api/application/dtos/user/auth-user.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { AuthenticateUserUseCase } from '@/api/application/usecases/user/authenticate-user.use-case'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { SuccessHttpResponse } from '../../responses/http-response'

export class AuthenticateUserController implements Controller<AuthUserInput, undefined, AuthSuccessResult> {
  constructor(readonly authenticateUser: AuthenticateUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<AuthUserInput>): Promise<IHttpResponse<AuthSuccessResult>> {
    const input = new AuthUserInput(request.body)
    const authSuccessResult = await this.authenticateUser.execute(input)
    return new SuccessHttpResponse(authSuccessResult)
  }
}
