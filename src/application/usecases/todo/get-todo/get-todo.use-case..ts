import { inject, injectable } from 'inversify'

import { UseCase } from '@/application/usecases/use-case'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { DynamodbTodoRepository } from '@/infrastructure/aws/repositories/dynamodb.todo.repository'

@injectable()
export class GetTodoUseCase implements UseCase<string, Todo> {
  constructor(@inject(DynamodbTodoRepository) private readonly todoRepository: Repository<Todo>) {}

  async execute(todoId: string): Promise<Todo> {
    return this.todoRepository.findById(todoId)
  }
}
