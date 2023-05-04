import { Repository } from './repository'
import { Todo } from '../models/todo'

export interface TodoRepository extends Repository<Todo> {
  create(todo: Todo): Promise<Todo>

  delete(id: string): Promise<void>

  update(todo: Todo): Promise<Todo>

  findById(todoId: string): Promise<Todo | null>

  findByUserId(userId: string): Promise<Todo[]>

  findAll(): Promise<Todo[]>
}
