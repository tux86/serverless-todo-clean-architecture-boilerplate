import { UpdateTodoInput } from '@/application/dtos/todo/update-todo-input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

export class UpdateTodoUseCase implements UseCase<UpdateTodoInput, Todo> {
  constructor(private readonly todoRepository: Repository<Todo>, private readonly validator: TodoValidator) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(UpdateTodoInput, input)
    const todo = input as Todo
    return this.todoRepository.update(todo)
  }
}
