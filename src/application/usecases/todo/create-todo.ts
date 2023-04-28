import { inject, injectable } from 'inversify'

import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { TYPES } from '@/common/ioc/types'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

@injectable()
export class CreateTodo implements UseCase<CreateTodoInput, Todo> {
  constructor(
    @inject(TYPES.TodoDynamodbRepository) private readonly todoRepository: Repository<Todo>,
    @inject(TYPES.TodoValidator) private readonly validator: TodoValidator
  ) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    await this.validator.validateCreateTodoInput(input)

    // const todo = new Todo(input.title, input.description, input.userId, input.status)
    return this.todoRepository.create(input as Todo)
  }
}
