import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { DeleteTodoInput } from '@/api/application/dtos/todo/delete-todo.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { DeleteTodoUseCase } from '@/api/application/use-cases/todo/delete-todo.use-case'
import { mapHttpAttributesToRequesterInfo } from '@/api/application/mappers/map-http-attributes-to-requester-info'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { DeletedHttpResponse } from '../../responses/http-response'

export class DeleteTodoController implements Controller<void> {
  constructor(readonly deleteTodo: DeleteTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<undefined, DeleteTodoInput>): Promise<IHttpResponse<void>> {
    const input: DeleteTodoInput = {
      requesterInfo: mapHttpAttributesToRequesterInfo(request.attributes),
      todoId: request.params.todoId
    }

    await this.deleteTodo.execute(input)
    return new DeletedHttpResponse()
  }
}
