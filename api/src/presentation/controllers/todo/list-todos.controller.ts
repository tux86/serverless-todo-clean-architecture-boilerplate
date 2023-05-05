import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { ListTodosInput } from '@/api/application/dtos/todo/list-todo.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { ListTodosUseCase } from '@/api/application/use-cases/todo/list-todos.use-case'
import { Todo } from '@/api/domain/models/todo'
import { mapHttpAttributesToRequesterInfo } from '@/api/application/mappers/map-http-attributes-to-requester-info'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { SuccessHttpResponse } from '../../responses/http-response'

export class ListTodosController implements Controller<Todo[]> {
  constructor(readonly listTodos: ListTodosUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest): Promise<IHttpResponse<Todo[]>> {
    const input: ListTodosInput = {
      requesterInfo: mapHttpAttributesToRequesterInfo(request.attributes)
    }
    const todos = await this.listTodos.execute(input)
    return new SuccessHttpResponse(todos)
  }
}
