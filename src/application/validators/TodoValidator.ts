import { validate, ValidationError } from 'class-validator'

import { CreateTodoInput } from '@/application/dtos/todo/CreateTodoInput'
import { UpdateTodoInput } from '@/application/dtos/todo/UpdateTodoInput'

export class TodoValidator {
  async validateCreateTodoInput (input: CreateTodoInput): Promise<void> {
    const errors: ValidationError[] = await validate(input)
    if (errors.length > 0) {
      throw new Error('Validation failed.') // You can customize the error handling based on your requirements.
    }
  }

  async validateUpdateTodoInput (input: UpdateTodoInput): Promise<void> {
    const errors: ValidationError[] = await validate(input)

    if (errors.length > 0) {
      throw new Error('Validation failed.') // You can customize the error handling based on your requirements.
    }
  }
}
