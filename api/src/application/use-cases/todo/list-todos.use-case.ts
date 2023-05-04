import { ListTodosInput } from '@/api/application/dtos/todo/list-todo.input'
import { Todo } from '@/api/domain/models/todo'
import { TodoRepository } from '@/api/domain/repositories/todo.repository'

import { UseCase } from '../use-case'

export class ListTodosUseCase implements UseCase<ListTodosInput, Todo[]> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(input: ListTodosInput): Promise<Todo[]> {
    if (input.requesterInfo.role === 'admin') {
      return this.todoRepository.findAll()
    }

    return this.todoRepository.findByUserId(input.requesterInfo.userId)
  }
}
