import { EntityNotFound, UserForbiddenError } from '@/api/application/errors'
import { TodoRepository } from '@/api/domain/repositories/todo.repository'

import { DeleteTodoInput } from '../../dtos/todo/delete-todo.input'
import { TodoValidator } from '../../validators/todo.validator'
import { UseCase } from '../use-case'

export class DeleteTodoUseCase implements UseCase<DeleteTodoInput, void> {
  constructor(private readonly todoRepository: TodoRepository, private readonly validator: TodoValidator) {}

  async execute(input: DeleteTodoInput): Promise<void> {
    this.validator.validateAndThrow(DeleteTodoInput, input)

    const { requesterInfo, todoId } = input
    const todo = await this.todoRepository.findById(todoId)

    if (!todo) {
      throw new EntityNotFound('Todo', todoId)
    }

    if (requesterInfo.role !== 'admin' && todo.userId !== requesterInfo.userId) {
      throw new UserForbiddenError('User not authorized to delete this todo')
    }

    await this.todoRepository.delete(input.todoId)
  }
}
