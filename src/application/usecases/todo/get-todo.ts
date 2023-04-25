import { UseCase } from '@/application/usecases/use-case'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

export class GetTodo implements UseCase<string, Todo> {
  constructor(private todoRepository: Repository<Todo>) {}

  async execute(todoId: string): Promise<Todo> {
    return this.todoRepository.findById(todoId)
  }
}
