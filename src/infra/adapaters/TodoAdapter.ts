import { Todo } from '@/domain/entities/Todo'
import { TodoEntity } from '@/infra/entities/TodoEntity'

export class TodoAdapter {
  static toDomainEntity(todoModel: TodoEntity): Todo {
    const { todoId, userId, title, description, status } = todoModel
    const todo = new Todo(title, description, userId, status, todoId)
    return todo
  }

  static toPersistenceModel(todo: Todo): TodoEntity {
    const { todoId, userId, title, description, status } = todo
    const todoModel: TodoEntity = {
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
}
