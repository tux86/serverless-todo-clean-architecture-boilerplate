import { inject, injectable } from 'inversify'

import { UseCase } from '@/application/usecases/use-case'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { Logger } from '@/infrastructure/utils/Logger'
import { TYPES } from '@/ioc/types'

const logger = Logger.getInstance()

@injectable()
export class DeleteTodo implements UseCase<string, void> {
  constructor(@inject(TYPES.TodoDynamodbRepository) private readonly todoRepository: Repository<Todo>) {
    logger.info('----------------------- initializing DeleteTodo -------------------')
  }

  async execute(todoId: string): Promise<void> {
    return this.todoRepository.delete(todoId)
  }
}
