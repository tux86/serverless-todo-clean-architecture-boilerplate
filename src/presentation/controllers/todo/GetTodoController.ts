import { Controller } from '@/application/interfaces/Controller'
import { Request } from '@/application/interfaces/Request'
import { Response } from '@/application/interfaces/Response'
import { GetTodo } from '@/application/usecases/todo/GetTodo'
import { Todo } from '@/domain/models/Todo'
import { SuccessResponse } from '@/presentation/utils/response'

export class GetTodoController implements Controller<Todo | never> {
  constructor(readonly getTodo: GetTodo) {}

  async handleRequest(request: Request<{ todoId: string }>): Promise<Response<Todo>> {
    const todo = await this.getTodo.execute(request.params.todoId)
    return new SuccessResponse(todo)
  }
}
