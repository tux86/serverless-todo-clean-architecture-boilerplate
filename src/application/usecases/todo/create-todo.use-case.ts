import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { UseCase } from '@/application/usecases/use-case'
import { BaseValidator } from '@/application/validators/abstract/base.validator'
import { Todo } from '@/domain/models/todo'
import { Repository } from '@/domain/repositories/repository'
import { uuidV4 } from '@/shared/helpers/uuid'

export class CreateTodoUseCase implements UseCase<CreateTodoInput, Todo> {
  constructor(private readonly todoRepository: Repository<Todo>, private readonly validator: BaseValidator) {}

  async execute(input: CreateTodoInput): Promise<Todo> {
    this.validator.validateAndThrow(CreateTodoInput, input)

    const todo: Todo = {
      todoId: uuidV4(),
      userId: input.userId,
      title: input.title,
      description: input.description,
      status: undefined
    }

    return this.todoRepository.create(todo)
  }
}
