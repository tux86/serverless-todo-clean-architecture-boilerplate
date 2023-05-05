import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { GetUserInput } from '@/api/application/dtos/user/get-user.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { GetUserUseCase } from '@/api/application/use-cases/user/get-user.use-case'
import { User } from '@/api/domain/models/user'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { SuccessHttpResponse } from '../../responses/http-response'

export class GetMeController implements Controller<User> {
  constructor(readonly getUser: GetUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest): Promise<IHttpResponse<User>> {
    const input = new GetUserInput({
      userId: request.attributes.userId
    })
    const user = await this.getUser.execute(input)
    return new SuccessHttpResponse(user)
  }
}
