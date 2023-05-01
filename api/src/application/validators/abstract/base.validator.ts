import { plainToInstance } from 'class-transformer'
import { validateSync, ValidatorOptions } from 'class-validator'

import { Constructor } from '@/api/shared/types'

import { InputValidationError } from '../../errors'
import { validationErrorsToString } from '../../utlis/validation/validation-errors-to-string'

export class BaseValidator {
  validateAndThrow<T extends object>(cls: Constructor<T>, object: T, validatorOptions?: ValidatorOptions): void {
    let validatableObject = object

    if (!(validatableObject instanceof cls)) {
      validatableObject = plainToInstance(cls, object, { groups: validatorOptions?.groups })
    }

    const errors = validateSync(validatableObject, validatorOptions)

    if (errors !== undefined && errors.length !== 0) {
      throw new InputValidationError(validationErrorsToString(errors))
    }
  }
}
