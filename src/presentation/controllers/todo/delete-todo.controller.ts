import { inject, injectable } from 'inversify'

import { DeleteTodoUseCase } from '@/application/usecases/todo/delete-todo/delete-todo.use-case'
import { Todo } from '@/domain/models/todo'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { DeletedHttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

@injectable()
export class DeleteTodoController implements Controller<Todo | never> {
  constructor(@inject(DeleteTodoUseCase) readonly deleteTodo: DeleteTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ todoId: string }>): Promise<IHttpResponse<Todo>> {
    await this.deleteTodo.execute(request.params.todoId)
    return new DeletedHttpResponse()
  }
}
