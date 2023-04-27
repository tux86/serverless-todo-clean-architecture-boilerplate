import { inject, injectable } from 'inversify'

import { UpdateTodoInput } from '@/application/dtos/todo/update-todo-input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { TYPES } from '@/ioc/types'

@injectable()
export class UpdateTodo implements UseCase<UpdateTodoInput, Todo> {
  constructor(
    @inject(TYPES.TodoDynamodbRepository) private readonly todoRepository: Repository<Todo>,
    @inject(TYPES.TodoValidator)
    private readonly validator: TodoValidator
  ) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    await this.validator.validateUpdateTodoInput(input)
    const todo = input as Todo
    return this.todoRepository.update(todo)
  }
}
