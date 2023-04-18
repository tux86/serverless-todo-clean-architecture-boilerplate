import { Todo } from '../../domain/Todo';

export interface TodoService {
    createTodo(userId: string, title: string): Promise<Todo>;
    getTodoById(id: string): Promise<Todo | null>;
    getTodosByUserId(userId: string): Promise<Todo[]>;
    updateTodo(
        id: string,
        userId: string,
        title: string,
        completed: boolean
    ): Promise<Todo>;
    deleteTodo(id: string, userId: string): Promise<void>;
}