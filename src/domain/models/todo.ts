export interface Todo {
  todoId: string

  title: string

  description: string

  userId: string

  status?: string

  createdAt: Date
  updatedAt?: Date
}
