import { UpdateTodoInput } from '@/application/dtos/todo/UpdateTodoInput'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { Repository } from '@/domain/interfaces/repositories/Repository'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Todo } from '@/domain/models/Todo'

export class UpdateTodoUseCase implements UseCase<UpdateTodoInput, Todo> {
  constructor (private todoRepository: Repository<Todo>, private validator: TodoValidator) {
  }

  async execute (input: UpdateTodoInput): Promise<Todo> {
    await this.validator.validateUpdateTodoInput(input)
    const todo = new Todo(input.title, input.description, undefined, input.status, input.todoId)
    return this.todoRepository.update(todo)
  }
}
