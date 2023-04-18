import { Todo } from '../domain/Todo';
import { TodoRepository } from '../interfaces/repositories/TodoRepository';
import { TodoService } from '../interfaces/services/TodoService';
import { v4 as uuidv4 } from 'uuid';

export class TodoServiceImplementation implements TodoService {
    constructor(private todoRepository: TodoRepository) {}

    async createTodo(userId: string, title: string): Promise<Todo> {
        const id = uuidv4();
        const completed = false;
        const todo = new Todo(id, userId, title, completed);
        await this.todoRepository.save(todo);
        return todo;
    }

    async getTodoById(id: string): Promise<Todo | null> {
        return this.todoRepository.findById(id);
    }

    async getTodosByUserId(userId: string): Promise<Todo[]> {
        return this.todoRepository.findByUserId(userId);
    }

    async updateTodo(
        id: string,
        userId: string,
        title: string,
        completed: boolean
    ): Promise<Todo> {
        const todo = await this.todoRepository.findById(id);

        if (!todo) {
            throw new Error('Todo not found');
        }

        if (todo.userId !== userId) {
            throw new Error('Not authorized to update this todo');
        }

        todo.title = title;
        todo.completed = completed;

        return this.todoRepository.save(todo);
    }

    async deleteTodo(id: string, userId: string): Promise<void> {
        const todo = await this.todoRepository.findById(id);

        if (!todo) {
            throw new Error('Todo not found');
        }

        if (todo.userId !== userId) {
            throw new Error('Not authorized to delete this todo');
        }

        await this.todoRepository.delete(id);
    }
}
