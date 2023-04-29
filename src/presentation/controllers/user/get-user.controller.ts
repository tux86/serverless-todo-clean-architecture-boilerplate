import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { GetUserInput } from '@/application/dtos/user/get-user.input'
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { GetUserUseCase } from '@/application/usecases/user/get-user.use-case'
import { User } from '@/domain/models/user'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { SuccessHttpResponse } from '@/presentation/responses/http-response'

@injectable()
export class GetUserController implements Controller<User | never> {
  constructor(@inject(GetUserUseCase) readonly getUser: GetUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<unknown, GetUserInput>): Promise<IHttpResponse<User>> {
    const input = request.params
    const user = await this.getUser.execute(input)
    return new SuccessHttpResponse(user)
  }
}
