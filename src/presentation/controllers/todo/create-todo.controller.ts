import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { Controller } from '@/application/interfaces/controller'
import { Request } from '@/application/interfaces/request'
import { Response } from '@/application/interfaces/response'
import { CreateTodo } from '@/application/usecases/todo/create-todo'
import { Todo } from '@/domain/models/todo'
import { uuidV4 } from '@/domain/utils/uuid-generator'
import { CreatedResponse } from '@/presentation/utils/response'

export class CreateTodoController implements Controller<Todo | never> {
  constructor(readonly createTodo: CreateTodo) {}

  async handleRequest(request: Request<CreateTodoInput>): Promise<Response<Todo>> {
    const input = request.body
    const todo = await this.createTodo.execute({ userId: uuidV4(), ...input })
    return new CreatedResponse(todo)
  }
}
