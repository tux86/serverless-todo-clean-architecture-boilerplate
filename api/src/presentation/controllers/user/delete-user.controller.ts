import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { DeleteUserInput } from '@/api/application/dtos/user/delete-user.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { DeleteUserUseCase } from '@/api/application/usecases/user/delete-user.use-case'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { DeletedHttpResponse } from '../../responses/http-response'

export class DeleteUserController implements Controller<void | never> {
  constructor(readonly deleteUser: DeleteUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<unknown, DeleteUserInput>): Promise<IHttpResponse<void>> {
    const input = new DeleteUserInput(request.params)
    await this.deleteUser.execute(input)
    return new DeletedHttpResponse()
  }
}
