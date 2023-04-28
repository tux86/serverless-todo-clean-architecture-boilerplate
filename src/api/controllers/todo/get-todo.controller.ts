import { inject, injectable } from 'inversify'

import { WithInterceptor } from '@/api/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/api/interceptors/error.interceptor'
import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { IHttpResponse, SuccessHttpResponse } from '@/api/protocols/http-response'
import { GetTodoUseCase } from '@/application/usecases/todo/get-todo/get-todo.use-case.'
import { Todo } from '@/domain/models/todo'

@injectable()
export class GetTodoController implements Controller<Todo | never> {
  constructor(@inject(GetTodoUseCase) readonly getTodo: GetTodoUseCase) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ todoId: string }>): Promise<IHttpResponse<Todo>> {
    const todo = await this.getTodo.execute(request.params.todoId)
    return new SuccessHttpResponse(todo)
  }
}
