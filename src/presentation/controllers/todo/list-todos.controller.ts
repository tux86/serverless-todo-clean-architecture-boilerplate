import { inject, injectable } from 'inversify'

import { ListTodosUseCase } from '@/application/usecases/todo/list-todos/list-todos.use-case'
import { Todo } from '@/domain/models/todo'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpResponse, SuccessHttpResponse } from '@/presentation/protocols/http-response'

@injectable()
export class ListTodosController implements Controller<Todo[] | never> {
  constructor(@inject(ListTodosUseCase) readonly listTodos: ListTodosUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(): Promise<IHttpResponse<Todo[]>> {
    const todos = await this.listTodos.execute()
    return new SuccessHttpResponse(todos)
  }
}
