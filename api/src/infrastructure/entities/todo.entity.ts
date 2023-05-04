import { TodoStatus } from '@/api/domain/models/todo'

export class TodoEntity {
  todoId: string
  title: string
  description: string
  status: TodoStatus
  userId: string
  createdAt: string
  updatedAt?: string

  constructor(todoEntity: TodoEntity) {
    this.todoId = todoEntity.todoId
    this.title = todoEntity.title
    this.description = todoEntity.description
    this.status = todoEntity.status
    this.userId = todoEntity.userId
    this.createdAt = todoEntity.createdAt
    this.updatedAt = todoEntity.updatedAt
  }
}
