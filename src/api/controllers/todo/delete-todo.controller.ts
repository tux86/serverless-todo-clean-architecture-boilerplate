import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { DeletedHttpResponse, IHttpResponse } from '@/api/protocols/http-response'
import { DeleteTodoUseCase } from '@/application/usecases/todo/delete-todo/delete-todo.use-case'
import { Todo } from '@/domain/models/todo'

@injectable()
export class DeleteTodoController implements Controller<Todo | never> {
  constructor(@inject(DeleteTodoUseCase) readonly deleteTodo: DeleteTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ todoId: string }>): Promise<IHttpResponse<Todo>> {
    await this.deleteTodo.execute(request.params.todoId)
    return new DeletedHttpResponse()
  }
}
