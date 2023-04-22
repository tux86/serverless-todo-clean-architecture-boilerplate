import { Repository } from '@/domain/interfaces/repositories/Repository'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Todo } from '@/domain/models/Todo'

export class DeleteTodoUseCase implements UseCase<string, void> {
  constructor (private todoRepository: Repository<Todo>) {}

  async execute (todoId: string): Promise<void> {
    return this.todoRepository.delete(todoId)
  }
}
