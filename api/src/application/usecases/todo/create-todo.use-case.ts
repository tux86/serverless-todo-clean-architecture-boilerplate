import { Todo } from '@/api/domain/models/todo'
import { Repository } from '@/api/domain/repositories/repository'
import { uuidV4 } from '@/api/shared/helpers/uuid'

import { CreateTodoInput } from '../../dtos/todo/create-todo.input'
import { BaseValidator } from '../../validators/abstract/base.validator'
import { UseCase } from '../use-case'

export class CreateTodoUseCase implements UseCase<CreateTodoInput, Todo> {
  constructor(private readonly todoRepository: Repository<Todo>, private readonly validator: BaseValidator) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(CreateTodoInput, input)

    const todo: Todo = {
      todoId: uuidV4(),
      userId: input.userId,
      title: input.title,
      description: input.description,
      status: undefined,
      createdAt: new Date()
    }

    return this.todoRepository.create(todo)
  }
}
