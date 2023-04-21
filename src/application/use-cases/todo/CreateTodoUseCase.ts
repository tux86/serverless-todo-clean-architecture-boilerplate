import { Todo } from '@/domain/entities/Todo'
import { Repository } from '@/domain/interfaces/Repository'
import { UseCase } from '@/domain/interfaces/UseCase'

interface CreateTodoInput {
    title: string;
    description: string;
    userId: string;
    status?: string;
}

export class CreateTodoUseCase implements UseCase<CreateTodoInput, Todo> {
  constructor (private todoRepository: Repository<Todo>) {
  }

  async execute (input: CreateTodoInput): Promise<Todo> {
    const todo = new Todo(input.title, input.description, input.userId, input.status)
    return this.todoRepository.create(todo)
  }
}
