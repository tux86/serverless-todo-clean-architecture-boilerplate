import { Todo } from '@/api/domain/models/todo'
import { Repository } from '@/api/domain/repositories/repository'

import { UseCase } from '../use-case'

export class ListTodosUseCase implements UseCase<void, Todo[]> {
  constructor(private readonly todoRepository: Repository<Todo>) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
