import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { CreateTodoInput } from '@/api/application/dtos/todo/create-todo.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { CreateTodoUseCase } from '@/api/application/usecases/todo/create-todo.use-case'
import { Todo } from '@/api/domain/models/todo'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { CreatedHttpResponse } from '../../responses/http-response'

export class CreateTodoController implements Controller<Todo | never> {
  constructor(readonly createTodo: CreateTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<CreateTodoInput>): Promise<IHttpResponse<Todo>> {
    const { userId } = request.attributes
    const input = new CreateTodoInput({ userId, ...request.body })

    const todo = await this.createTodo.execute(input)
    return new CreatedHttpResponse(todo)
  }
}
