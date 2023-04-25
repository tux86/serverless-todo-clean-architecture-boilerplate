import { UseCase } from '@/application/usecases/use-case'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

export class DeleteTodo implements UseCase<string, void> {
  constructor(private todoRepository: Repository<Todo>) {}

  async execute(todoId: string): Promise<void> {
    return this.todoRepository.delete(todoId)
  }
}
