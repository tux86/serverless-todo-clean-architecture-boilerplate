import { DeleteTodoInput } from '@/application/dtos/todo/delete-todo.input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

export class DeleteTodoUseCase implements UseCase<DeleteTodoInput, void> {
  constructor(private readonly todoRepository: Repository<Todo>, private readonly validator: TodoValidator) {}

  async execute(args: DeleteTodoInput): Promise<void> {
    this.validator.validateAndThrow(DeleteTodoInput, args)
    return this.todoRepository.delete(args.todoId)
  }
}
