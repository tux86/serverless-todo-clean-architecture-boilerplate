import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { IHttpResponse, SuccessHttpResponse } from '@/api/protocols/http-response'
import { GetUserUseCase } from '@/application/usecases/user/get-user/get-user.use-case'
import { User } from '@/domain/models/user'

@injectable()
export class GetUserController implements Controller<User | never> {
  constructor(@inject(GetUserUseCase) readonly getUser: GetUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ userId: string }>): Promise<IHttpResponse<User>> {
    const user = await this.getUser.execute(request.params.userId)
    return new SuccessHttpResponse(user)
  }
}
