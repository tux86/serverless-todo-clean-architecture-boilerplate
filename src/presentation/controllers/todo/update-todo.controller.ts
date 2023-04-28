import { inject, injectable } from 'inversify'

import { UpdateTodoInput } from '@/application/usecases/todo/update-todo/update-todo-input'
import { UpdateTodoUseCase } from '@/application/usecases/todo/update-todo/update-todo.use-case'
import { Todo } from '@/domain/models/todo'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse, UpdatedHttpResponse } from '@/presentation/protocols/http-response'

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
