import { inject, injectable } from 'inversify'

import { ListTodos } from '@/application/usecases/todo/list-todos'
import { Todo } from '@/domain/models/todo'
import { TYPES } from '@/ioc/types'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { WithInterceptor } from '@/presentation/interfaces/interceptor'
import { IHttpResponse, SuccessHttpResponse } from '@/presentation/protocols/http-response'

@injectable()
export class ListTodosController implements Controller<Todo[] | never> {
  constructor(@inject(TYPES.ListTodos) readonly listTodos: ListTodos) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(): Promise<IHttpResponse<Todo[]>> {
    const todos = await this.listTodos.execute()
    return new SuccessHttpResponse(todos)
  }
}
