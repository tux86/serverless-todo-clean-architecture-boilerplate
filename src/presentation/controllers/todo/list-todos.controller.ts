import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { Controller } from '@/application/ports/controller'
import { IHttpResponse } from '@/application/ports/http-response'
import { ListTodosUseCase } from '@/application/usecases/todo/list-todos.use-case'
import { Todo } from '@/domain/models/todo'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { SuccessHttpResponse } from '@/presentation/responses/http-response'

export class ListTodosController implements Controller<Todo[] | never> {
  constructor(readonly listTodos: ListTodosUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(): Promise<IHttpResponse<Todo[]>> {
    const todos = await this.listTodos.execute()
    return new SuccessHttpResponse(todos)
  }
}
