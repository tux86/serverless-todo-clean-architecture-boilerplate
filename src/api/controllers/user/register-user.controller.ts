import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { CreatedHttpResponse, IHttpResponse } from '@/api/protocols/http-response'
import { RegisterUserInput } from '@/application/usecases/user/register-user/register-user.input'
import { RegisterUserUseCase } from '@/application/usecases/user/register-user/register-user.use-case'
import { User } from '@/domain/models/user'

@injectable()
export class RegisterUserController implements Controller<User | never> {
  constructor(@inject(RegisterUserUseCase) readonly registerUser: RegisterUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<RegisterUserInput>): Promise<IHttpResponse<User>> {
    const input = request.body
    const user = await this.registerUser.execute(input)
    return new CreatedHttpResponse(user)
  }
}
