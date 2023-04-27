import { GetTodo } from '@/application/usecases/todo/get-todo'
import { Todo } from '@/domain/models/todo'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { WithInterceptor } from '@/presentation/interceptors/interceptor'
import { Controller } from '@/presentation/protocols/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse, SuccessHttpResponse } from '@/presentation/protocols/http-response'

export class GetTodoController implements Controller<Todo | never> {
  constructor(readonly getTodo: GetTodo) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ todoId: string }>): Promise<IHttpResponse<Todo>> {
    const todo = await this.getTodo.execute(request.params.todoId)
    return new SuccessHttpResponse(todo)
  }
}
