import { Controller } from '@/application/interfaces/controller'
import { Request } from '@/application/interfaces/request'
import { Response } from '@/application/interfaces/response'
import { DeleteTodo } from '@/application/usecases/todo/delete-todo'
import { Todo } from '@/domain/models/todo'
import { DeletedResponse } from '@/presentation/utils/response'

export class DeleteTodoController implements Controller<Todo | never> {
  constructor(readonly deleteTodo: DeleteTodo) {}

  async handleRequest(request: Request<{ todoId: string }>): Promise<Response<Todo>> {
    await this.deleteTodo.execute(request.params.todoId)
    return new DeletedResponse()
  }
}
