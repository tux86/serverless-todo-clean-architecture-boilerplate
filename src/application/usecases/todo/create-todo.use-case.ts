import { inject, injectable } from 'inversify'

import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { UseCase } from '@/application/usecases/use-case'
import { BaseValidator } from '@/application/validators/abstract/base.validator'
import { TYPES } from '@/common/ioc'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

@injectable()
export class CreateTodoUseCase implements UseCase<CreateTodoInput, Todo> {
  constructor(
    @inject(TYPES.TodoRepository) private readonly todoRepository: Repository<Todo>,
    @inject(TYPES.TodoValidator) private readonly validator: BaseValidator
  ) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(CreateTodoInput, input)

    // const todo = new Todo(input.title, input.description, input.userId, input.status)
    return this.todoRepository.create(input as Todo)
  }
}
