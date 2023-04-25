import { UpdateTodoInput } from '@/application/dtos/todo/update-todo-input'
import { Controller } from '@/application/interfaces/controller'
import { Request } from '@/application/interfaces/request'
import { Response } from '@/application/interfaces/response'
import { UpdateTodo } from '@/application/usecases/todo/update-todo'
import { Todo } from '@/domain/models/todo'
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
