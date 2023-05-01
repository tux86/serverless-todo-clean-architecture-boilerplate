import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { GetTodoInput } from '@/api/application/dtos/todo/get-todo.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { GetTodoUseCase } from '@/api/application/usecases/todo/get-todo.use-case.'
import { Todo } from '@/api/domain/models/todo'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { SuccessHttpResponse } from '../../responses/http-response'

export class GetTodoController implements Controller<Todo | never> {
  constructor(readonly getTodo: GetTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<undefined, GetTodoInput>): Promise<IHttpResponse<Todo>> {
    const input = new GetTodoInput(request.params)
    const todo = await this.getTodo.execute(input)
    return new SuccessHttpResponse(todo)
  }
}
