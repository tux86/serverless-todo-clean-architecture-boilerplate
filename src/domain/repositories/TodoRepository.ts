import { Repository } from './Repository'
import { Todo } from '../models/Todo'

export interface TodoRepository extends Repository<Todo> {
  create(todo: Todo): Promise<Todo>

  delete(id: string): Promise<void>

  update(todo: Todo): Promise<Todo>

  findById(todoId: string): Promise<Todo | null>

  findAll(): Promise<Todo[]>
}
