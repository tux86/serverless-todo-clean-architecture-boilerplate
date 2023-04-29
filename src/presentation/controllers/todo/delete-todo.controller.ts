import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/application/decorators/interceptor.decorator'
import { DeleteTodoInput } from '@/application/dtos/todo/delete-todo.input'
import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { IHttpResponse } from '@/application/ports/http-response'
import { DeleteTodoUseCase } from '@/application/usecases/todo/delete-todo.use-case'
import { TYPES } from '@/common/ioc'
import { Todo } from '@/domain/models/todo'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { DeletedHttpResponse } from '@/presentation/responses/http-response'

@injectable()
export class DeleteTodoController implements Controller<Todo | never> {
  constructor(@inject(TYPES.DeleteTodoUseCase) readonly deleteTodo: DeleteTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<undefined, DeleteTodoInput>): Promise<IHttpResponse<Todo>> {
    await this.deleteTodo.execute(new DeleteTodoInput(request.params))
    return new DeletedHttpResponse()
  }
}
