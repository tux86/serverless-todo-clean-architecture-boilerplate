import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { IHttpResponse, SuccessHttpResponse } from '@/api/protocols/http-response'
import { AuthSuccessResult } from '@/application/usecases/user/authenticate-user/auth-success.result'
import { AuthUserInput } from '@/application/usecases/user/authenticate-user/auth-user.input'
import { AuthenticateUserUseCase } from '@/application/usecases/user/authenticate-user/authenticate-user.use-case'

@injectable()
export class AuthenticateUserController implements Controller<AuthSuccessResult | never> {
  constructor(@inject(AuthenticateUserUseCase) readonly authenticateUser: AuthenticateUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<AuthUserInput>): Promise<IHttpResponse<AuthSuccessResult>> {
    const input = request.body
    const authSuccessResult = await this.authenticateUser.execute(input)
    return new SuccessHttpResponse(authSuccessResult)
  }
}
