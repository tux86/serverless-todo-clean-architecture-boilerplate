import { UpdateTodoInput } from '@/application/dtos/todo/UpdateTodoInput'
import { Controller } from '@/application/interfaces/Controller'
import { Request } from '@/application/interfaces/Request'
import { Response } from '@/application/interfaces/Response'
import { UpdateTodo } from '@/application/usecases/todo/UpdateTodo'
import { Todo } from '@/domain/models/Todo'
import { UpdatedResponse } from '@/presentation/utils/response'

export class UpdateTodoController implements Controller<Todo | never> {
  constructor(readonly updateTodo: UpdateTodo) {}

  async handleRequest(request: Request<UpdateTodoInput, { todoId: string }>): Promise<Response<Todo>> {
    const input = request.body
    const { todoId } = request.query
    const todo = await this.updateTodo.execute({ todoId, ...input })
    return new UpdatedResponse(todo)
  }
}
