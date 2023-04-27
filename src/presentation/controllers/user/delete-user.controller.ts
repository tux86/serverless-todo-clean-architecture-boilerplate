import { DeleteUser } from '@/application/usecases/user/delete-user'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { WithInterceptor } from '@/presentation/interceptors/interceptor'
import { Controller } from '@/presentation/protocols/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { DeletedHttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

export class DeleteUserController implements Controller<void | never> {
  constructor(readonly deleteUser: DeleteUser) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ userId: string }>): Promise<IHttpResponse<void>> {
    await this.deleteUser.execute(request.params.userId)
    return new DeletedHttpResponse()
  }
}
