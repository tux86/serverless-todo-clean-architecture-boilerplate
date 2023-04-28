import { inject, injectable } from 'inversify'

import { UseCase } from '@/application/usecases/use-case'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { DynamodbTodoRepository } from '@/infrastructure/aws/repositories/dynamodb.todo.repository'

@injectable()
export class DeleteTodoUseCase implements UseCase<string, void> {
  constructor(@inject(DynamodbTodoRepository) private readonly todoRepository: Repository<Todo>) {}

  async execute(todoId: string): Promise<void> {
    return this.todoRepository.delete(todoId)
  }
}
