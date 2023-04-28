import { inject, injectable } from 'inversify'

import { UpdateTodoInput } from '@/application/usecases/todo/update-todo/update-todo-input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { DynamodbTodoRepository } from '@/infrastructure/aws/repositories/dynamodb.todo.repository'

@injectable()
export class UpdateTodoUseCase implements UseCase<UpdateTodoInput, Todo> {
  constructor(
    @inject(DynamodbTodoRepository) private readonly todoRepository: Repository<Todo>,
    @inject(TodoValidator)
    private readonly validator: TodoValidator
  ) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    await this.validator.validateUpdateTodoInput(input)
    const todo = input as Todo
    return this.todoRepository.update(todo)
  }
}
