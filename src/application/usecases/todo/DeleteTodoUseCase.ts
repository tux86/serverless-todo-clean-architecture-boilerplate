import { Todo } from '@/domain/entities/Todo'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Repository } from '@/domain/repositories/Repository'

export class DeleteTodoUseCase implements UseCase<string, void> {
  constructor (private todoRepository: Repository<Todo>) {}

  async execute (todoId: string): Promise<void> {
    return this.todoRepository.delete(todoId)
  }
}
