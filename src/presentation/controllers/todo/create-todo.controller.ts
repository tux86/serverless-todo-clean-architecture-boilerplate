import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { CreateTodo } from '@/application/usecases/todo/create-todo'
import { Todo } from '@/domain/models/todo'
import { uuidV4 } from '@/domain/utils/uuid-generator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { WithInterceptor } from '@/presentation/interceptors/interceptor'
import { Controller } from '@/presentation/protocols/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { CreatedHttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

export class CreateTodoController implements Controller<Todo | never> {
  constructor(readonly createTodo: CreateTodo) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<CreateTodoInput>): Promise<IHttpResponse<Todo>> {
    const input = request.body

    const todo = await this.createTodo.execute({ userId: uuidV4(), ...input })
    return new CreatedHttpResponse(todo)
  }
}
