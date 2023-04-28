import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { IHttpResponse, UpdatedHttpResponse } from '@/api/protocols/http-response'
import { UpdateTodoInput } from '@/application/usecases/todo/update-todo/update-todo-input'
import { UpdateTodoUseCase } from '@/application/usecases/todo/update-todo/update-todo.use-case'
import { Todo } from '@/domain/models/todo'

@injectable()
export class UpdateTodoController implements Controller<Todo | never> {
  constructor(@inject(UpdateTodoUseCase) readonly updateTodo: UpdateTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<UpdateTodoInput, { todoId: string }>): Promise<IHttpResponse<Todo>> {
    const input = request.body
    const { todoId } = request.query
    const todo = await this.updateTodo.execute({ todoId, ...input })
    return new UpdatedHttpResponse(todo)
  }
}
