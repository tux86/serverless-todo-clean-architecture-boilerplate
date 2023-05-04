export * from './http.errors'

export class ApplicationError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class InputValidationError extends ApplicationError {}

export class EntityNotFound extends InputValidationError {
  constructor(entityName: string, identifier: string) {
    super(`${entityName} with identifier ${identifier} not found`)
  }
}

export class UserAccountAlreadyExists extends InputValidationError {
  constructor(message?: string) {
    super(message || 'User account already exists')
    this.name = 'UserAccountAlreadyExists'
  }
}

export class AuthFailedError extends InputValidationError {
  constructor(message?: string) {
    super(message || 'Authentication failed')
    this.name = 'AuthFailedError'
  }
}

export class UserForbiddenError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'User forbidden error')
    this.name = 'UserForbiddenError'
  }
}

export class UserNotAuthorizedError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'User not authorized')
    this.name = 'UserNotAuthorizedError'
  }
}
