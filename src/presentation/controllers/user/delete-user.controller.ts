import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { DeleteUserInput } from '@/application/dtos/user/delete-user.input'
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { DeleteUserUseCase } from '@/application/usecases/user/delete-user.use-case'
import { TYPES } from '@/common/ioc'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { DeletedHttpResponse } from '@/presentation/responses/http-response'

@injectable()
export class DeleteUserController implements Controller<void | never> {
  constructor(@inject(TYPES.DeleteUserUseCase) readonly deleteUser: DeleteUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<unknown, DeleteUserInput>): Promise<IHttpResponse<void>> {
    const input = new DeleteUserInput(request.params)
    await this.deleteUser.execute(input)
    return new DeletedHttpResponse()
  }
}
