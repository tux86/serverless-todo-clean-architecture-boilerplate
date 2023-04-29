import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { RegisterUserInput } from '@/application/dtos/user/register-user.input'
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { RegisterUserUseCase } from '@/application/usecases/user/register-user.use-case'
import { User } from '@/domain/models/user'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { CreatedHttpResponse } from '@/presentation/responses/http-response'

export class RegisterUserController implements Controller<User | never> {
  constructor(readonly registerUser: RegisterUserUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<RegisterUserInput>): Promise<IHttpResponse<User>> {
    const input = new RegisterUserInput(request.body)
    const user = await this.registerUser.execute(input)
    return new CreatedHttpResponse(user)
  }
}
