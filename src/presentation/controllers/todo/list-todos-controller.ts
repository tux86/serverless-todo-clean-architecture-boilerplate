import { Controller } from '@/application/interfaces/controller'
import { Response } from '@/application/interfaces/response'
import { ListTodos } from '@/application/usecases/todo/list-todos'
import { Todo } from '@/domain/models/todo'
import { SuccessResponse } from '@/presentation/utils/response'

export class ListTodoController implements Controller<Todo[] | never> {
  constructor(readonly listTodos: ListTodos) {}

  async handleRequest(): Promise<Response<Todo[]>> {
    const todos = await this.listTodos.execute()
    return new SuccessResponse(todos)
  }
}
