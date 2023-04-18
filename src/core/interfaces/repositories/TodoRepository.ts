import { Todo } from '../../domain/Todo';

export interface TodoRepository {
    save(todo: Todo): Promise<Todo>;
    findById(id: string): Promise<Todo | null>;
    findByUserId(userId: string): Promise<Todo[]>;
    delete(id: string): Promise<void>;
}