
import { Repository } from '@/domain/interfaces/repositories/Repository'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Todo } from '@/domain/models/Todo'

export class ListTodosUseCase implements UseCase<void, Todo[]> {
  constructor (private todoRepository: Repository<Todo>) {}

  async execute (): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
