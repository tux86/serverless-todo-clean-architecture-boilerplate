import { validate, ValidationError } from 'class-validator'

import { Todo } from '@/domain/entities/Todo'

export class TodoValidator {
  async validateCreateOrUpdate (todoData: Partial<Todo>): Promise<void> {
    const todo = new Todo(
      todoData.title,
      todoData.description,
      todoData.userId,
      todoData.status,
      todoData.todoId
    )

    const errors: ValidationError[] = await validate(todo)

    if (errors.length > 0) {
      throw new Error('Validation failed.') // You can customize the error handling based on your requirements.
    }
  }

  validateId (id: string | undefined): void {
    if (!id) {
      throw new Error('Todo ID is required.') // You can customize the error handling based on your requirements.
    }
  }
}
