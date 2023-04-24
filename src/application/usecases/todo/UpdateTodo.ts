import { UpdateTodoInput } from '@/application/dtos/todo/UpdateTodoInput'
import { UseCase } from '@/application/usecases/UseCase'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { Todo } from '@/domain/models/Todo'
import { Repository } from '@/domain/repositories/Repository'

export class UpdateTodo implements UseCase<UpdateTodoInput, Todo> {
  constructor(private todoRepository: Repository<Todo>, private validator: TodoValidator) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    await this.validator.validateUpdateTodoInput(input)
    const todo = input as Todo
    return this.todoRepository.update(todo)
  }
}
