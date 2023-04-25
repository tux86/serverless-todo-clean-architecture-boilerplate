import { UpdateTodoInput } from '@/application/dtos/todo/update-todo-input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

export class UpdateTodo implements UseCase<UpdateTodoInput, Todo> {
  constructor(private todoRepository: Repository<Todo>, private validator: TodoValidator) {}

  async execute(input: UpdateTodoInput): Promise<Todo> {
    await this.validator.validateUpdateTodoInput(input)
    const todo = input as Todo
    return this.todoRepository.update(todo)
  }
}
