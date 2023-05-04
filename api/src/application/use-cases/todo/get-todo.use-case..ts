import { EntityNotFound, UserNotAuthorizedError } from '@/api/application/errors'
import { Todo } from '@/api/domain/models/todo'
import { TodoRepository } from '@/api/domain/repositories/todo.repository'

import { GetTodoInput } from '../../dtos/todo/get-todo.input'
import { TodoValidator } from '../../validators/todo.validator'
import { UseCase } from '../use-case'

export class GetTodoUseCase implements UseCase<GetTodoInput, Todo> {
  constructor(private readonly todoRepository: TodoRepository, private readonly validator: TodoValidator) {}

  async execute(input: GetTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(GetTodoInput, input)

    const todo = await this.todoRepository.findById(input.todoId)

    if (!todo) {
      throw new EntityNotFound('Todo', input.todoId)
    }

    if (input.requesterInfo.role !== 'admin' && todo.userId !== input.requesterInfo.userId) {
      throw new UserNotAuthorizedError('User not authorized to access this todo')
    }

    return todo
  }
}
