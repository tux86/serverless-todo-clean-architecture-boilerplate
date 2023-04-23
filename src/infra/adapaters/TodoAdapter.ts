import { CreateTodoInput } from '@/application/dtos/todo/CreateTodoInput'
import { Todo } from '@/domain/entities/Todo'
import { TodoModel } from '@/infra/entities/TodoModel'

export class TodoAdapter {
  static toDomainEntity (todoModel: TodoModel): Todo {
    const { todoId, userId, title, description, status } = todoModel
    const todo = new Todo(title, description, userId, status, todoId)
    return todo
  }

  static toPersistenceModel (todo: Todo): TodoModel {
    const { todoId, userId, title, description, status } = todo
    const todoModel: TodoModel = {
      todoId,
      title,
      description,
      userId,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return todoModel
  }

  static toCreateTodoInput (todo: Todo): CreateTodoInput {
    const { userId, title, description } = todo
    const createTodoDTO: CreateTodoInput = {
      userId,
      title,
      description
    }
    return createTodoDTO
  }
}
