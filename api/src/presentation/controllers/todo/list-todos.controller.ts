import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { Controller } from '@/api/application/ports/controller'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { ListTodosUseCase } from '@/api/application/usecases/todo/list-todos.use-case'
import { Todo } from '@/api/domain/models/todo'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { SuccessHttpResponse } from '../../responses/http-response'

export class ListTodosController implements Controller<Todo[] | never> {
  constructor(readonly listTodos: ListTodosUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(): Promise<IHttpResponse<Todo[]>> {
    const todos = await this.listTodos.execute()
    return new SuccessHttpResponse(todos)
  }
}
