export enum TodoStatus {
  Created = 'created',
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
  Archived = 'archived'
}

export class Todo {
  readonly todoId: string
  readonly title: string
  readonly description: string
  readonly userId: string
  readonly status: TodoStatus
  readonly createdAt: Date
  readonly updatedAt?: Date

  constructor(data: Todo) {
    this.todoId = data.todoId
    this.title = data.title
    this.description = data.description
    this.userId = data.userId
    this.status = data.status
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
