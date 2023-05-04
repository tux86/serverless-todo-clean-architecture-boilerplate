import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { UpdateTodoInput, UpdateTodoPayload } from '@/api/application/dtos/todo/update-todo-input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { UpdateTodoUseCase } from '@/api/application/use-cases/todo/update-todo.use-case'
import { Todo } from '@/api/domain/models/todo'
import { mapHttpAttributesToRequesterInfo } from '@/api/mappers/map-http-attributes-to-requester-info'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { UpdatedHttpResponse } from '../../responses/http-response'

export class UpdateTodoController implements Controller<Todo> {
  constructor(readonly updateTodo: UpdateTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<UpdateTodoPayload, { todoId: string }>): Promise<IHttpResponse<Todo>> {
    const { todoId } = request.params
    const input: UpdateTodoInput = {
      requesterInfo: mapHttpAttributesToRequesterInfo(request.attributes),
      payload: { todoId, ...request.body }
    }
    const todo = await this.updateTodo.execute(input)
    return new UpdatedHttpResponse(todo)
  }
}
