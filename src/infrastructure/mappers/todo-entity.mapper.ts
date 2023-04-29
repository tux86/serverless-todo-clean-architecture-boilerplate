import { Todo } from '@/domain/models/todo'
import { TodoEntity } from '@/infrastructure/entities/todo.entity'
import { IMapper } from '@/infrastructure/mappers/mapper'

export class TodoEntityMapper implements IMapper<Partial<TodoEntity>, Todo> {
  public toDomainModel(todoEntity: Partial<TodoEntity>): Todo {
    const { todoId, userId, title, description, status, createdAt, updatedAt } = todoEntity

    return {
      todoId,
      userId,
      title,
      description,
      status,
      createdAt: createdAt ? new Date(createdAt) : undefined,
      updatedAt: updatedAt ? new Date(updatedAt) : undefined
    }
  }

  toPersistenceEntity(todo: Partial<Todo>): Partial<TodoEntity> {
    const { todoId, userId, title, description, status, createdAt, updatedAt } = todo

    return {
      todoId,
      userId,
      title,
      description,
      status,
      createdAt: createdAt ? createdAt.toISOString() : undefined,
      updatedAt: updatedAt ? updatedAt.toISOString() : undefined
    }
  }
}
