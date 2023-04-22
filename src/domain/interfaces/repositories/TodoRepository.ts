import { Repository } from './Repository'
import { Todo } from '../../models/Todo'

export interface TodoRepository extends Repository<Todo> {
    create(todo: Todo): Promise<Todo>;

    delete(id: string): Promise<void>;

    update(todo: Todo): Promise<Todo>;

    get(id: string, userId: string): Promise<Todo | null>;
}
