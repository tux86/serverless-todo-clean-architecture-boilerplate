import { UpdateTodoInput } from '@/application/dtos/todo/update-todo-input'
import { UpdateTodo } from '@/application/usecases/todo/update-todo'
import { Todo } from '@/domain/models/todo'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { WithInterceptor } from '@/presentation/interceptors/interceptor'
import { Controller } from '@/presentation/protocols/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse, UpdatedHttpResponse } from '@/presentation/protocols/http-response'

export class UpdateTodoController implements Controller<Todo | never> {
  constructor(readonly updateTodo: UpdateTodo) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<UpdateTodoInput, { todoId: string }>): Promise<IHttpResponse<Todo>> {
    const input = request.body
    const { todoId } = request.query
    const todo = await this.updateTodo.execute({ todoId, ...input })
    return new UpdatedHttpResponse(todo)
  }
}
