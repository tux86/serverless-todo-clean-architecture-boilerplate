import { CreateTodoInput } from '@/application/dtos/todo/CreateTodoInput'
import { Controller } from '@/application/interfaces/Controller'
import { Request } from '@/application/interfaces/Request'
import { Response } from '@/application/interfaces/Response'
import { CreateTodo } from '@/application/usecases/todo/CreateTodo'
import { Todo } from '@/domain/models/Todo'
import { uuidV4 } from '@/domain/utils/uuidGenerator'
import { CreatedResponse } from '@/presentation/utils/response'

export class CreateTodoController implements Controller<Todo | never> {
  constructor(readonly createTodo: CreateTodo) {}

  async handleRequest(request: Request<CreateTodoInput>): Promise<Response<Todo>> {
    const input = request.body
    const todo = await this.createTodo.execute({ userId: uuidV4(), ...input })
    return new CreatedResponse(todo)
  }
}
