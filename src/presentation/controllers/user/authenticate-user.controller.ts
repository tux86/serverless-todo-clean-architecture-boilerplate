import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { AuthSuccessResult } from '@/application/dtos/user/auth-success.result'
import { AuthUserInput } from '@/application/dtos/user/auth-user.input'
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { AuthenticateUserUseCase } from '@/application/usecases/user/authenticate-user.use-case'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { SuccessHttpResponse } from '@/presentation/responses/http-response'

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
