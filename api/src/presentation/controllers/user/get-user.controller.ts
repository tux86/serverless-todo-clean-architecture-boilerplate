import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { GetUserInput } from '@/api/application/dtos/user/get-user.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { GetUserUseCase } from '@/api/application/usecases/user/get-user.use-case'
import { User } from '@/api/domain/models/user'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { SuccessHttpResponse } from '../../responses/http-response'

export class GetUserController implements Controller<User | never> {
  constructor(readonly getUser: GetUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<unknown, GetUserInput>): Promise<IHttpResponse<User>> {
    const input = new GetUserInput(request.params)
    const user = await this.getUser.execute(input)
    return new SuccessHttpResponse(user)
  }
}
