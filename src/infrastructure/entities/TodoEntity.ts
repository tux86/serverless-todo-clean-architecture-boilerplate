import { Todo } from '@/domain/models/Todo'

export class TodoEntity implements Todo {
  description: string
  status?: string
  title: string
  todoId: string
  userId: string
  createdAt: Date
  updatedAt?: Date
}
