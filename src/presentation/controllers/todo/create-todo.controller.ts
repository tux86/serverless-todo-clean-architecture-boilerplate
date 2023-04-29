import * as console from 'console'

import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { CreateTodoUseCase } from '@/application/usecases/todo/create-todo.use-case'
import { Todo } from '@/domain/models/todo'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { CreatedHttpResponse } from '@/presentation/responses/http-response'
import { uuidV4 } from '@/shared/helpers/uuid'

export class CreateTodoController implements Controller<Todo | never> {
  constructor(readonly createTodo: CreateTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<CreateTodoInput>): Promise<IHttpResponse<Todo>> {
    const userId = uuidV4() // TODO should be retrieved from token
    const input = new CreateTodoInput({ userId, ...request.body })

    console.log(input)
    const todo = await this.createTodo.execute(input)
    return new CreatedHttpResponse(todo)
  }
}
