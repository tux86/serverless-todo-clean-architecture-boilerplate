import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { GetTodoInput } from '@/application/dtos/todo/get-todo.input'
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { GetTodoUseCase } from '@/application/usecases/todo/get-todo.use-case.'
import { TYPES } from '@/common/ioc'
import { Todo } from '@/domain/models/todo'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { SuccessHttpResponse } from '@/presentation/responses/http-response'

@injectable()
export class GetTodoController implements Controller<Todo | never> {
  constructor(@inject(TYPES.GetTodoUseCase) readonly getTodo: GetTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<undefined, GetTodoInput>): Promise<IHttpResponse<Todo>> {
    const input = new GetTodoInput(request.params)
    const todo = await this.getTodo.execute(input)
    return new SuccessHttpResponse(todo)
  }
}
