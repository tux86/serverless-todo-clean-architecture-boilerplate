import { Constructor } from '@/common/types'
import { plainToInstance } from 'class-transformer'
import { ClassTransformOptions } from 'class-transformer/types/interfaces'
import { validateSync, ValidatorOptions } from 'class-validator'

import { InputValidationError } from '../../errors'
import { validationErrorsToString } from '../../utlis/validation/validation-errors-to-string'

export class BaseValidator {
  validateAndThrow<T extends object>(cls: Constructor<T>, object: T, validatorOptions?: ValidatorOptions): void {
    // Enable nested validation
    const defaultOptions: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true
    }

    const options: ClassTransformOptions = { ...defaultOptions, ...validatorOptions }

    let validatableObject = object

    if (!(validatableObject instanceof cls)) {
      validatableObject = plainToInstance(cls, object, { groups: options.groups })
    }

    const errors = validateSync(validatableObject, options)

    if (errors !== undefined && errors.length !== 0) {
      throw new InputValidationError(validationErrorsToString(errors))
    }
  }
}
