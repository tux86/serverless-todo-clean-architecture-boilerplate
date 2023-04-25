import { UseCase } from '@/application/usecases/use-case'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

export class ListTodos implements UseCase<void, Todo[]> {
  constructor(private todoRepository: Repository<Todo>) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
