import { EntityNotFound, UserNotAuthorizedError } from '@/api/application/errors'
import { Todo } from '@/api/domain/models/todo'
import { TodoRepository } from '@/api/domain/repositories/todo.repository'

import { UpdateTodoInput } from '../../dtos/todo/update-todo-input'
import { TodoValidator } from '../../validators/todo.validator'
import { UseCase } from '../use-case'

export class UpdateTodoUseCase implements UseCase<UpdateTodoInput, Todo> {
  constructor(private readonly todoRepository: TodoRepository, private readonly validator: TodoValidator) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(UpdateTodoInput, input)

    const { requesterInfo, payload } = input

    const existingTodo = await this.todoRepository.findById(payload.todoId)

    if (!existingTodo) {
      throw new EntityNotFound('Todo', payload.todoId)
    }

    if (requesterInfo.role !== 'admin' && existingTodo.userId !== requesterInfo.userId) {
      throw new UserNotAuthorizedError('User not authorized to delete this todo')
    }

    const todo = new Todo({
      ...existingTodo,
      ...payload,
      updatedAt: new Date()
    })

    return this.todoRepository.update(todo)
  }
}
