import { inject, injectable } from 'inversify'

import { AuthSuccessResult } from '@/application/usecases/user/authenticate-user/auth-success.result'
import { AuthUserInput } from '@/application/usecases/user/authenticate-user/auth-user.input'
import { AuthenticateUserUseCase } from '@/application/usecases/user/authenticate-user/authenticate-user.use-case'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse, SuccessHttpResponse } from '@/presentation/protocols/http-response'

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
