import { v4 as uuidv4 } from 'uuid'

export class Todo {
  todoId: string

  title: string

  description: string

  userId: string

  status?: string

  constructor(title: string, description: string, userId: string, status?: string, todoId?: string) {
    this.todoId = todoId || uuidv4()
    this.title = title
    this.description = description
    this.userId = userId
    this.status = status
  }
}
