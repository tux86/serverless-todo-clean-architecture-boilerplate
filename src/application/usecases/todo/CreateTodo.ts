import { CreateTodoInput } from '@/application/dtos/todo/CreateTodoInput'
import { UseCase } from '@/application/usecases/UseCase'
import { TodoValidator } from '@/application/validators/TodoValidator'
import { Todo } from '@/domain/models/Todo'
import { Repository } from '@/domain/repositories/Repository'

export class CreateTodo implements UseCase<CreateTodoInput, Todo> {
  constructor(private todoRepository: Repository<Todo>, private validator: TodoValidator) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    await this.validator.validateCreateTodoInput(input)

    // const todo = new Todo(input.title, input.description, input.userId, input.status)
    return this.todoRepository.create(input as Todo)
  }
}
