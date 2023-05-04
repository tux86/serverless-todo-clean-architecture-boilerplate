import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { ListUsersInput } from '@/api/application/dtos/user/list-users.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { ListUsersUseCase } from '@/api/application/use-cases/user/list-users.use-case'
import { User } from '@/api/domain/models/user'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { SuccessHttpResponse } from '../../responses/http-response'

export class ListUsersController implements Controller<User[]> {
  constructor(readonly listUsersUseCase: ListUsersUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest): Promise<IHttpResponse<User[]>> {
    const input = new ListUsersInput({ requestingUserRole: request.attributes.role })

    const users = await this.listUsersUseCase.execute(input)
    return new SuccessHttpResponse(users)
  }
}
