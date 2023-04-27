import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { injectable } from 'inversify'

import { CreateTodoInput } from '@/application/dtos/todo/create-todo.input'
import { UpdateTodoInput } from '@/application/dtos/todo/update-todo-input'
import { InvalidInputError } from '@/application/errors'
import { formatValidationErrors } from '@/application/utlis/format-validation-errors'

@injectable()
export class TodoValidator {
  async validateCreateTodoInput(input: CreateTodoInput): Promise<void> {
    const transformedInput = plainToClass(CreateTodoInput, input)
    const errors: ValidationError[] = await validate(transformedInput)
    if (errors.length > 0) {
      throw new InvalidInputError(formatValidationErrors(errors))
    }
  }

  async validateUpdateTodoInput(input: UpdateTodoInput): Promise<void> {
    const transformedInput = plainToClass(UpdateTodoInput, input)
    const errors: ValidationError[] = await validate(transformedInput)
    if (errors.length > 0) {
      throw new InvalidInputError(formatValidationErrors(errors))
    }
  }
}
