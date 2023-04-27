import { inject, injectable } from 'inversify'

import { DeleteTodo } from '@/application/usecases/todo/delete-todo'
import { Todo } from '@/domain/models/todo'
import { Logger } from '@/infrastructure/utils/Logger'
import { TYPES } from '@/ioc/types'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { DeletedHttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

const logger = Logger.getInstance()

@injectable()
export class DeleteTodoController implements Controller<Todo | never> {
  constructor(@inject(TYPES.DeleteTodo) readonly deleteTodo: DeleteTodo) {
    logger.debug(`------------------- initializing ${this.constructor.name} -------------------`)
  }

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<{ todoId: string }>): Promise<IHttpResponse<Todo>> {
    await this.deleteTodo.execute(request.params.todoId)
    return new DeletedHttpResponse()
  }
}
