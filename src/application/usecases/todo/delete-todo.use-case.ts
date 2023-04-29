import { inject, injectable } from 'inversify'

import { DeleteTodoInput } from '@/application/dtos/todo/delete-todo.input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { TYPES } from '@/common/ioc'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

@injectable()
export class DeleteTodoUseCase implements UseCase<DeleteTodoInput, void> {
  constructor(
    @inject(TYPES.TodoRepository) private readonly todoRepository: Repository<Todo>,
    @inject(TYPES.TodoValidator) private readonly validator: TodoValidator
  ) {}

  async execute(args: DeleteTodoInput): Promise<void> {
    this.validator.validateAndThrow(DeleteTodoInput, args)
    return this.todoRepository.delete(args.todoId)
  }
}
