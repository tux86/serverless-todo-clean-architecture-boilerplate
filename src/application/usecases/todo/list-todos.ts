import { inject, injectable } from 'inversify'

import { UseCase } from '@/application/usecases/use-case'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { TYPES } from '@/ioc/types'

@injectable()
export class ListTodos implements UseCase<void, Todo[]> {
  constructor(@inject(TYPES.TodoDynamodbRepository) private readonly todoRepository: Repository<Todo>) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
