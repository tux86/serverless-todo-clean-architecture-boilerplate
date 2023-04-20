import { Todo } from '../entities/Todo';
import {IRepository} from "./IRepository";

export interface TodoRepository extends IRepository<Todo>{
    create(todo: Todo): Promise<Todo>;
    delete(id: string): Promise<void>;
    update(todo: Todo): Promise<Todo>;
    get(id: string, userId: string): Promise<Todo | null>;
}
