import { WithInterceptor } from '@/api/application/decorators/interceptor.decorator'
import { DeleteTodoInput } from '@/api/application/dtos/todo/delete-todo.input'
import { Controller } from '@/api/application/ports/controller'
import { IHttpRequest } from '@/api/application/ports/http-request'
import { IHttpResponse } from '@/api/application/ports/http-response'
import { DeleteTodoUseCase } from '@/api/application/usecases/todo/delete-todo.use-case'
import { Todo } from '@/api/domain/models/todo'

import { ErrorInterceptor } from '../../interceptors/error.interceptor'
import { DeletedHttpResponse } from '../../responses/http-response'

export class DeleteTodoController implements Controller<Todo | never> {
  constructor(readonly deleteTodo: DeleteTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<undefined, DeleteTodoInput>): Promise<IHttpResponse<Todo>> {
    await this.deleteTodo.execute(new DeleteTodoInput(request.params))
    return new DeletedHttpResponse()
  }
}
