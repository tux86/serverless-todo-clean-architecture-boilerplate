import { UseCase } from '@/application/usecases/UseCase'
import { Todo } from '@/domain/models/Todo'
import { Repository } from '@/domain/repositories/Repository'

export class DeleteTodo implements UseCase<string, void> {
  constructor(private todoRepository: Repository<Todo>) {}

  async execute(todoId: string): Promise<void> {
    return this.todoRepository.delete(todoId)
  }
}
