import { inject, injectable } from 'inversify'

import { CreateTodoInput } from '@/application/usecases/todo/create-todo/create-todo.input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { DynamodbTodoRepository } from '@/infrastructure/aws/repositories/dynamodb.todo.repository'

@injectable()
export class CreateTodoUseCase implements UseCase<CreateTodoInput, Todo> {
  constructor(
    @inject(DynamodbTodoRepository) private readonly todoRepository: Repository<Todo>,
    @inject(TodoValidator) private readonly validator: TodoValidator
  ) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    await this.validator.validateCreateTodoInput(input)

    // const todo = new Todo(input.title, input.description, input.userId, input.status)
    return this.todoRepository.create(input as Todo)
  }
}
