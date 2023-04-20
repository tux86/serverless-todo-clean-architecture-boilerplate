import {IUseCase} from "../../../domain/interfaces/IUseCase";
import {Todo} from "../../../domain/entities/Todo";
import {IRepository} from "../../../domain/interfaces/IRepository";

interface CreateTodoInput {
    title: string;
    description: string;
    userId: string;
    status?: string;
}

export class CreateTodo implements IUseCase<CreateTodoInput, Todo> {
    constructor(private todoRepository: IRepository<Todo>) {}

    async execute(input: CreateTodoInput): Promise<Todo> {
        const todo = new Todo(input.title, input.description, input.userId, input.status);
        return this.todoRepository.create(todo);
    }
}
