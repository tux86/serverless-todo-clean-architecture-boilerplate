import { Todo } from '@/domain/entities/Todo'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Repository } from '@/domain/repositories/Repository'

export class GetTodoUseCase implements UseCase<string, Todo> {
  constructor(private todoRepository: Repository<Todo>) {}

  async execute(todoId: string): Promise<Todo> {
    return this.todoRepository.findById(todoId)
  }
}
