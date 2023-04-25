import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { UseCase } from '@/application/usecases/use-case'
import { TodoValidator } from '@/application/validators/todo.validator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'

export class CreateTodo implements UseCase<CreateTodoInput, Todo> {
  constructor(private todoRepository: Repository<Todo>, private validator: TodoValidator) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    await this.validator.validateCreateTodoInput(input)

    // const todo = new Todo(input.title, input.description, input.userId, input.status)
    return this.todoRepository.create(input as Todo)
  }
}
