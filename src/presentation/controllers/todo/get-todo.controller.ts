import { inject, injectable } from 'inversify'

import { GetTodo } from '@/application/usecases/todo/get-todo'
import { TYPES } from '@/common/ioc/types'
import { Todo } from '@/domain/models/todo'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { IHttpResponse, SuccessHttpResponse } from '@/presentation/protocols/http-response'

@injectable()
export class GetTodoController implements Controller<Todo | never> {
  constructor(@inject(TYPES.GetTodo) readonly getTodo: GetTodo) {}

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ todoId: string }>): Promise<IHttpResponse<Todo>> {
    const todo = await this.getTodo.execute(request.params.todoId)
    return new SuccessHttpResponse(todo)
  }
}
