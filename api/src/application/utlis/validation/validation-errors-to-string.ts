import { ValidationError } from 'class-validator'

const collectErrorMessages = (validationErrors: ValidationError[]): string[] => {
  const errorMessages: string[] = []

  for (const error of validationErrors) {
    if (error.constraints) {
      errorMessages.push(...Object.values(error.constraints))
    }

    if (error.children && error.children.length > 0) {
      errorMessages.push(...collectErrorMessages(error.children))
    }
  }

  return errorMessages
}

export const validationErrorsToString = (errors: ValidationError[]): string => {
  const allErrorMessages = collectErrorMessages(errors).join(', ')
  return `Validation failed: ${allErrorMessages}`
}
