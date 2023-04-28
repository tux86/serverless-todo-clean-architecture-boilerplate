import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { injectable } from 'inversify'

import { InvalidInputError } from '@/application/errors'
import { CreateTodoInput } from '@/application/usecases/todo/create-todo/create-todo.input'
import { UpdateTodoInput } from '@/application/usecases/todo/update-todo/update-todo-input'
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
