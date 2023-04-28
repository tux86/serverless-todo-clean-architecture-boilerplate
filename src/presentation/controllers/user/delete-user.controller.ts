import { inject, injectable } from 'inversify'

import { DeleteUserUseCase } from '@/application/usecases/user/delete-user/delete-user.use-case'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { DeletedHttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

@injectable()
export class DeleteUserController implements Controller<void | never> {
  constructor(@inject(DeleteUserUseCase) readonly deleteUser: DeleteUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ userId: string }>): Promise<IHttpResponse<void>> {
    await this.deleteUser.execute(request.params.userId)
    return new DeletedHttpResponse()
  }
}
