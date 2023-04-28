import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { DeletedHttpResponse, IHttpResponse } from '@/api/protocols/http-response'
import { DeleteUserUseCase } from '@/application/usecases/user/delete-user/delete-user.use-case'

@injectable()
export class DeleteUserController implements Controller<void | never> {
  constructor(@inject(DeleteUserUseCase) readonly deleteUser: DeleteUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ userId: string }>): Promise<IHttpResponse<void>> {
    await this.deleteUser.execute(request.params.userId)
    return new DeletedHttpResponse()
  }
}
