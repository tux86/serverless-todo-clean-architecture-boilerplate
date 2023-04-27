import { inject, injectable } from 'inversify'

import { AuthSuccessResult } from '@/application/dtos/user/auth-success-result'
import { AuthUserInput } from '@/application/dtos/user/auth-user-input'
import { AuthenticateUser } from '@/application/usecases/user/authenticate-user'
import { Logger } from '@/infrastructure/helpers/Logger'
import { TYPES } from '@/ioc/types'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { WithInterceptor } from '@/presentation/interceptors/interceptor'
import { Controller } from '@/presentation/protocols/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse, SuccessHttpResponse } from '@/presentation/protocols/http-response'

const logger = Logger.getInstance()

@injectable()
export class AuthenticateUserController implements Controller<AuthSuccessResult | never> {
  constructor(@inject(TYPES.AuthenticateUser) readonly authenticateUser: AuthenticateUser) {
    logger.info('----------------------- initializing AuthenticateUserController -------------------')
  }

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<AuthUserInput>): Promise<IHttpResponse<AuthSuccessResult>> {
    const input = request.body
    const authSuccessResult = await this.authenticateUser.execute(input)
    return new SuccessHttpResponse(authSuccessResult)
  }
}
