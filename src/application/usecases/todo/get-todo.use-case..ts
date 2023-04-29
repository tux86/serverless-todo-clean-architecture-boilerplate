import { inject, injectable } from 'inversify'

import { GetTodoInput } from '@/application/dtos/todo/get-todo.input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { TYPES } from '@/common/ioc'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

@injectable()
export class GetTodoUseCase implements UseCase<GetTodoInput, Todo> {
  constructor(
    @inject(TYPES.TodoRepository) private readonly todoRepository: Repository<Todo>,
    @inject(TYPES.TodoValidator) private readonly validator: TodoValidator
  ) {}

  async execute(args: GetTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(GetTodoInput, args)
    return this.todoRepository.findById(args.todoId)
  }
}
