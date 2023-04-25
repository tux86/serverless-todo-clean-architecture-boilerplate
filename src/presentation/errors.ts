import { HttpStatus } from '@/presentation/utils/http-status'

export class HttpError extends Error {
  public readonly message: string
  public readonly statusCode: number

  constructor(message: string, statusCode = HttpStatus.BAD_REQUEST) {
    super(message)
    this.message = message
    this.statusCode = statusCode
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST)
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED)
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND)
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN)
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
