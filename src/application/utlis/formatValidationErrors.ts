import { ValidationError } from 'class-validator'

export const formatValidationErrors = (errors: ValidationError[]): string => {
  const formattedErrors = errors.map((error) => Object.values(error.constraints || {})).join(', ')
  return `Validation failed: ${formattedErrors}`
}
