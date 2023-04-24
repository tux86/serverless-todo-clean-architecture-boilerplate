import { Controller } from '@/application/interfaces/Controller'
import { Response } from '@/application/interfaces/Response'
import { ListTodos } from '@/application/usecases/todo/ListTodos'
import { Todo } from '@/domain/models/Todo'
import { SuccessResponse } from '@/presentation/utils/response'

export class ListTodoController implements Controller<Todo[] | never> {
  constructor(readonly listTodos: ListTodos) {}

  async handleRequest(): Promise<Response<Todo[]>> {
    const todos = await this.listTodos.execute()
    return new SuccessResponse(todos)
  }
}
