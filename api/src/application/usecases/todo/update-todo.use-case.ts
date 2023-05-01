import { Todo } from '@/api/domain/models/todo'
import { Repository } from '@/api/domain/repositories/repository'

import { UpdateTodoInput } from '../../dtos/todo/update-todo-input'
import { TodoValidator } from '../../validators/todo.validator'
import { UseCase } from '../use-case'

export class UpdateTodoUseCase implements UseCase<UpdateTodoInput, Todo> {
  constructor(private readonly todoRepository: Repository<Todo>, private readonly validator: TodoValidator) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(UpdateTodoInput, input)

    const todo: Partial<Todo> = {
      ...input,
      updatedAt: new Date()
    }

    return this.todoRepository.update(todo)
  }
}
