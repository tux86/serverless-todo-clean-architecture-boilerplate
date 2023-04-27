import { inject, injectable } from 'inversify'

import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { CreateTodo } from '@/application/usecases/todo/create-todo'
import { Todo } from '@/domain/models/todo'
import { uuidV4 } from '@/domain/utils/uuid-generator'
import { Logger } from '@/infrastructure/utils/Logger'
import { TYPES } from '@/ioc/types'
import { WithInterceptor } from '@/presentation/decorators/interceptor.decorator'
import { ErrorInterceptor } from '@/presentation/interceptors/error.interceptor'
import { Controller } from '@/presentation/interfaces/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'
import { CreatedHttpResponse, IHttpResponse } from '@/presentation/protocols/http-response'

const logger = Logger.getInstance()

@injectable()
export class CreateTodoController implements Controller<Todo | never> {
  constructor(@inject(TYPES.CreateTodo) readonly createTodo: CreateTodo) {
    logger.debug(`------------------- initializing ${this.constructor.name} -------------------`)
  }

  @WithInterceptor(new ErrorInterceptor())
  async handleRequest(request: IHttpRequest<CreateTodoInput>): Promise<IHttpResponse<Todo>> {
    const input = request.body

    const todo = await this.createTodo.execute({ userId: uuidV4(), ...input })
    return new CreatedHttpResponse(todo)
  }
}
