import { inject, injectable } from 'inversify'

import { UseCase } from '@/application/usecases/use-case'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { DynamodbTodoRepository } from '@/infrastructure/aws/repositories/dynamodb.todo.repository'

@injectable()
export class ListTodosUseCase implements UseCase<void, Todo[]> {
  constructor(@inject(DynamodbTodoRepository) private readonly todoRepository: Repository<Todo>) {}

  async execute(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }
}
