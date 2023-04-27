import { inject, injectable } from 'inversify'

import { RegisterUserInput } from '@/application/dtos/user/register-user-input'
import { RegisterUser } from '@/application/usecases/user/register-user'
import { User } from '@/domain/models/user'
import { TYPES } from '@/ioc/types'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { WithInterceptor } from '@/presentation/interceptors/interceptor'
import { Controller } from '@/presentation/protocols/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { CreatedHttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

@injectable()
export class RegisterUserController implements Controller<User | never> {
  constructor(@inject(TYPES.RegisterUser) readonly registerUser: RegisterUser) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<RegisterUserInput>): Promise<IHttpResponse<User>> {
    const input = request.body
    const user = await this.registerUser.execute(input)
    return new CreatedHttpResponse(user)
  }
}
