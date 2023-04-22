import { ValidationError } from 'class-validator'

export const formatValidationErrors = (errors: ValidationError[]): string => {
  const formattedErrors = errors
    .map(error => {
      const constraints = Object.values(error.constraints || {}).join(',')
      return `${error.property}: ${constraints}`
    })
    .join('; ')

  return `Validation failed: ${formattedErrors}`
}
