import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { UpdateTodoInput } from '@/application/dtos/todo/update-todo-input'
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { UpdateTodoUseCase } from '@/application/usecases/todo/update-todo.use-case'
import { TYPES } from '@/common/ioc'
import { Todo } from '@/domain/models/todo'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { UpdatedHttpResponse } from '@/presentation/responses/http-response'

@injectable()
export class UpdateTodoController implements Controller<Todo | never> {
  constructor(@inject(TYPES.UpdateTodoUseCase) readonly updateTodo: UpdateTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<UpdateTodoInput, { todoId: string }>): Promise<IHttpResponse<Todo>> {
    const { todoId } = request.query
    const input = new UpdateTodoInput({ todoId, ...request.body })
    const todo = await this.updateTodo.execute(input)
    return new UpdatedHttpResponse(todo)
  }
}
