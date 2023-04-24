import { UseCase } from '@/application/usecases/UseCase'
import { Todo } from '@/domain/models/Todo'
import { Repository } from '@/domain/repositories/Repository'

export class ListTodos implements UseCase<void, Todo[]> {
  constructor(private todoRepository: Repository<Todo>) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
