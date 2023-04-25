import { Controller } from '@/application/interfaces/controller'
import { Request } from '@/application/interfaces/request'
import { Response } from '@/application/interfaces/response'
import { GetTodo } from '@/application/usecases/todo/get-todo'
import { Todo } from '@/domain/models/todo'
import { SuccessResponse } from '@/presentation/utils/response'

export class GetTodoController implements Controller<Todo | never> {
  constructor(readonly getTodo: GetTodo) {}

  async handleRequest(request: Request<{ todoId: string }>): Promise<Response<Todo>> {
    const todo = await this.getTodo.execute(request.params.todoId)
    return new SuccessResponse(todo)
  }
}
