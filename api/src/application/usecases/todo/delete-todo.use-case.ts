import { Todo } from '@/api/domain/models/todo'
import { Repository } from '@/api/domain/repositories/repository'

import { DeleteTodoInput } from '../../dtos/todo/delete-todo.input'
import { TodoValidator } from '../../validators/todo.validator'
import { UseCase } from '../use-case'

export class DeleteTodoUseCase implements UseCase<DeleteTodoInput, void> {
  constructor(private readonly todoRepository: Repository<Todo>, private readonly validator: TodoValidator) {}

  async execute(args: DeleteTodoInput): Promise<void> {
    this.validator.validateAndThrow(DeleteTodoInput, args)
    return this.todoRepository.delete(args.todoId)
  }
}
