import { inject, injectable } from 'inversify'

import { CreateTodoInput } from '@/application/usecases/todo/create-todo/create-todo.input'
import { CreateTodoUseCase } from '@/application/usecases/todo/create-todo/create-todo.use-case'
import { Todo } from '@/domain/models/todo'
import { uuidV4 } from '@/domain/utils/uuid-generator'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { CreatedHttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

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
