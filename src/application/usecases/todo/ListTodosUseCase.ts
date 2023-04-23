import { Todo } from '@/domain/entities/Todo'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Repository } from '@/domain/repositories/Repository'

export class ListTodosUseCase implements UseCase<void, Todo[]> {
  constructor(private todoRepository: Repository<Todo>) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
