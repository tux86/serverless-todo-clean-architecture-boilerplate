import { Todo } from '@/domain/models/todo'
import { TodoEntity } from '@/infrastructure/entities/todo.entity'

export class TodoAdapter {
  static toDomainEntity(todoModel: TodoEntity): Todo {
    return { ...todoModel } as Todo
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
