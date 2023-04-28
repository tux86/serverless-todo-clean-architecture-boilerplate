import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { CreatedHttpResponse, IHttpResponse } from '@/api/protocols/http-response'
import { CreateTodoInput } from '@/application/usecases/todo/create-todo/create-todo.input'
import { CreateTodoUseCase } from '@/application/usecases/todo/create-todo/create-todo.use-case'
import { Todo } from '@/domain/models/todo'
import { uuidV4 } from '@/domain/utils/uuid-generator'

@injectable()
export class CreateTodoController implements Controller<Todo | never> {
  constructor(@inject(CreateTodoUseCase) readonly createTodo: CreateTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<CreateTodoInput>): Promise<IHttpResponse<Todo>> {
    const input = request.body

    const todo = await this.createTodo.execute({ userId: uuidV4(), ...input })
    return new CreatedHttpResponse(todo)
  }
}
