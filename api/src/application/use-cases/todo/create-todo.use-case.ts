import { uuidV4 } from '@/common/uuid'

import { Todo, TodoStatus } from '@/api/domain/models/todo'
import { TodoRepository } from '@/api/domain/repositories/todo.repository'

import { CreateTodoInput } from '../../dtos/todo/create-todo.input'
import { BaseValidator } from '../../validators/abstract/base.validator'
import { UseCase } from '../use-case'

export class CreateTodoUseCase implements UseCase<CreateTodoInput, Todo> {
  constructor(private readonly todoRepository: TodoRepository, private readonly validator: BaseValidator) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(CreateTodoInput, input)

    const todo = new Todo({
      todoId: uuidV4(),
      userId: input.userId,
      title: input.title,
      description: input.description,
      status: input.status ?? TodoStatus.Created,
      createdAt: new Date()
    })

    return await this.todoRepository.create(todo)
  }
}
