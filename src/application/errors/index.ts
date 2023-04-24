export class ApplicationError extends Error {
  constructor(message: string) {
    super(message)
  }
}

export class InvalidInputError extends ApplicationError {}

export class EntityNotFound extends ApplicationError {
  constructor(entityName: string, identifier: string) {
    super(`${entityName} with identifier ${identifier} not found`)
  }
}

export class AuthFailedError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Authentication failed')
    this.name = 'AuthFailedError'

    // Ensure the correct prototype chain is set, especially for transpiled code
    Object.setPrototypeOf(this, AuthFailedError.prototype)
  }
}
