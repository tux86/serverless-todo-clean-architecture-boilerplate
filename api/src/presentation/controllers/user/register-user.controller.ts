import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { RegisterUserInput } from '@/api/application/dtos/user/register-user.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { RegisterUserUseCase } from '@/api/application/usecases/user/register-user.use-case'
import { User } from '@/api/domain/models/user'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { CreatedHttpResponse } from '../../responses/http-response'

export class RegisterUserController implements Controller<RegisterUserInput, undefined, User> {
  constructor(readonly registerUser: RegisterUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<RegisterUserInput>): Promise<IHttpResponse<User>> {
    const input = new RegisterUserInput(request.body)

    const user = await this.registerUser.execute(input)
    return new CreatedHttpResponse(user)
  }
}
