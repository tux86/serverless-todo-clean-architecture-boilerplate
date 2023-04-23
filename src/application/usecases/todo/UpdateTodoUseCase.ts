import { UpdateTodoInput } from '@/application/dtos/todo/UpdateTodoInput'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { Todo } from '@/domain/entities/Todo'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Repository } from '@/domain/repositories/Repository'

export class UpdateTodoUseCase implements UseCase<UpdateTodoInput, Todo> {
  constructor (private todoRepository: Repository<Todo>, private validator: TodoValidator) {
  }

  async execute (input: UpdateTodoInput): Promise<Todo> {
    await this.validator.validateUpdateTodoInput(input)
    const todo = new Todo(input.title, input.description, undefined, input.status, input.todoId)
    return this.todoRepository.update(todo)
  }
}
