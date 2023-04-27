import { ListTodos } from '@/application/usecases/todo/list-todos'
import { Todo } from '@/domain/models/todo'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { WithInterceptor } from '@/presentation/interceptors/interceptor'
import { Controller } from '@/presentation/protocols/controller'
import { IHttpResponse, SuccessHttpResponse } from '@/presentation/protocols/http-response'

export class ListTodoController implements Controller<Todo[] | never> {
  constructor(readonly listTodos: ListTodos) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(): Promise<IHttpResponse<Todo[]>> {
    const todos = await this.listTodos.execute()
    return new SuccessHttpResponse(todos)
  }
}
