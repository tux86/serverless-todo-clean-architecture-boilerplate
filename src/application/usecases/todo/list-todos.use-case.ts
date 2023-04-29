import { inject, injectable } from 'inversify'

import { UseCase } from '@/application/usecases/use-case'
import { TYPES } from '@/common/ioc'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

@injectable()
export class ListTodosUseCase implements UseCase<void, Todo[]> {
  constructor(@inject(TYPES.TodoRepository) private readonly todoRepository: Repository<Todo>) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
