import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpResponse, SuccessHttpResponse } from '@/api/protocols/http-response'
import { ListTodosUseCase } from '@/application/usecases/todo/list-todos/list-todos.use-case'
import { Todo } from '@/domain/models/todo'

@injectable()
export class ListTodosController implements Controller<Todo[] | never> {
  constructor(@inject(ListTodosUseCase) readonly listTodos: ListTodosUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(): Promise<IHttpResponse<Todo[]>> {
    const todos = await this.listTodos.execute()
    return new SuccessHttpResponse(todos)
  }
}
