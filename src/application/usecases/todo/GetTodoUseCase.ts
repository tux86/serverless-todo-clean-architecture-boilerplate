
import { Repository } from '@/domain/interfaces/repositories/Repository'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Todo } from '@/domain/models/Todo'

export class GetTodoUseCase implements UseCase<string, Todo> {
  constructor (private todoRepository: Repository<Todo>) {}

  async execute (todoId: string): Promise<Todo> {
    return this.todoRepository.findById(todoId)
  }
}
