import { uuidV4 } from '@/domain/utils/uuidGenerator'

export class Todo {
  todoId: string

  title: string

  description: string

  userId: string

  status?: string

  constructor(title: string, description: string, userId: string, status?: string, todoId?: string) {
    this.todoId = todoId || uuidV4()
    this.title = title
    this.description = description
    this.userId = userId
    this.status = status
  }
}
