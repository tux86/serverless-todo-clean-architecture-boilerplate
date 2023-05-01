import { Todo } from '@/api/domain/models/todo'
import { Repository } from '@/api/domain/repositories/repository'

import { GetTodoInput } from '../../dtos/todo/get-todo.input'
import { TodoValidator } from '../../validators/todo.validator'
import { UseCase } from '../use-case'

export class GetTodoUseCase implements UseCase<GetTodoInput, Todo> {
  constructor(private readonly todoRepository: Repository<Todo>, private readonly validator: TodoValidator) {}

  async execute(args: GetTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(GetTodoInput, args)
    return this.todoRepository.findById(args.todoId)
  }
}
