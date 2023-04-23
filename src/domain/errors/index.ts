export class EntityNotFound extends Error {
  constructor (entityName: string, identifier: string) {
    super(`${entityName} with identifier ${identifier} not found`)
  }
}

export class AuthFailedError extends Error {
  constructor (message?: string) {
    super(message || 'Authentication failed')
    this.name = 'AuthFailedError'

    // Ensure the correct prototype chain is set, especially for transpiled code
    Object.setPrototypeOf(this, AuthFailedError.prototype)
  }
}
