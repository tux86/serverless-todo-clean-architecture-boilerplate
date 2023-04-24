import { Controller } from '@/application/interfaces/Controller'
import { Request } from '@/application/interfaces/Request'
import { Response } from '@/application/interfaces/Response'
import { DeleteTodo } from '@/application/usecases/todo/DeleteTodo'
import { Todo } from '@/domain/models/Todo'
import { DeletedResponse } from '@/presentation/utils/response'

export class DeleteTodoController implements Controller<Todo | never> {
  constructor(readonly deleteTodo: DeleteTodo) {}

  async handleRequest(request: Request<{ todoId: string }>): Promise<Response<Todo>> {
    await this.deleteTodo.execute(request.params.todoId)
    return new DeletedResponse()
  }
}
