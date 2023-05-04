import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { CreateAdminUserInput } from '@/api/application/dtos/user/create-admin-user.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { CreateAdminUserUseCase } from '@/api/application/use-cases/user/create-admin-user.use-case'
import { User } from '@/api/domain/models/user'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { CreatedHttpResponse } from '../../responses/http-response'

export class CreateAdminUserController implements Controller<User> {
  constructor(readonly registerUser: CreateAdminUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<CreateAdminUserInput>): Promise<IHttpResponse<User>> {
    const input: CreateAdminUserInput = {
      ...request.body
    }
    const user = await this.registerUser.execute(input)
    return new CreatedHttpResponse(user)
  }
}
