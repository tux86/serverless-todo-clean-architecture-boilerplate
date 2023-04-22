import { CreateTodoInput } from '@/application/dtos/todo/CreateTodoInput'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { Repository } from '@/domain/interfaces/repositories/Repository'
import { UseCase } from '@/domain/interfaces/UseCase'
import { Todo } from '@/domain/models/Todo'

export class CreateTodoUseCase implements UseCase<CreateTodoInput, Todo> {
  constructor (private todoRepository: Repository<Todo>, private validator: TodoValidator) {
  }

  async execute (input: CreateTodoInput): Promise<Todo> {
    await this.validator.validateCreateTodoInput(input)
    const todo = new Todo(input.title, input.description, input.userId, input.status)
    return this.todoRepository.create(todo)
  }
}
