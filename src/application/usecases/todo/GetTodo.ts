import { UseCase } from '@/application/usecases/UseCase'
import { Todo } from '@/domain/models/Todo'
import { Repository } from '@/domain/repositories/Repository'

export class GetTodo implements UseCase<string, Todo> {
  constructor(private todoRepository: Repository<Todo>) {}

  async execute(todoId: string): Promise<Todo> {
    return this.todoRepository.findById(todoId)
  }
}
