import { EntityNotFound, UserNotAuthorizedError } from '@/api/application/errors'
import { Todo } from '@/api/domain/models/todo'
import { Repository } from '@/api/domain/repositories/repository'

import { DeleteTodoInput } from '../../dtos/todo/delete-todo.input'
import { TodoValidator } from '../../validators/todo.validator'
import { UseCase } from '../use-case'

export class DeleteTodoUseCase implements UseCase<DeleteTodoInput, void> {
  constructor(private readonly todoRepository: Repository<Todo>, private readonly validator: TodoValidator) {}

  async execute(input: DeleteTodoInput): Promise<void> {
    this.validator.validateAndThrow(DeleteTodoInput, input)
    const todo = await this.todoRepository.findById(input.todoId)

    if (!todo) {
      throw new EntityNotFound('Todo', input.todoId)
    }

    if (todo.userId !== input.userId) {
      throw new UserNotAuthorizedError('User not authorized to delete this todo')
    }

    return this.todoRepository.delete(input.todoId)
  }
}
