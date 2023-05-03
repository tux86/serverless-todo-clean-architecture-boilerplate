import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { UpdateTodoInput } from '@/api/application/dtos/todo/update-todo-input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { UpdateTodoUseCase } from '@/api/application/usecases/todo/update-todo.use-case'
import { Todo } from '@/api/domain/models/todo'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { UpdatedHttpResponse } from '../../responses/http-response'

export class UpdateTodoController implements Controller<UpdateTodoInput, { todoId: string }, Todo> {
  constructor(readonly updateTodo: UpdateTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<UpdateTodoInput, { todoId: string }>): Promise<IHttpResponse<Todo>> {
    const { todoId } = request.params
    const input = new UpdateTodoInput({ todoId, ...request.body })
    const todo = await this.updateTodo.execute(input)
    return new UpdatedHttpResponse(todo)
  }
}
