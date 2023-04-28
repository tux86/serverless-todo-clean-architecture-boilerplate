import {
  BadRequestError,
  HttpError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError
} from '@/api/protocols/http-error'
import { ApplicationError, AuthFailedError, EntityNotFound } from '@/application/errors'

// Define an interface for the error mapping object.
interface ErrorMapping {
  [key: string]: new (message: string) => HttpError
}

// Create an error mapping object, which maps the domain error names to their corresponding HTTP error constructors.
const errorMappings: ErrorMapping = {
  [EntityNotFound.name]: NotFoundError,
  [ApplicationError.name]: BadRequestError,
  [AuthFailedError.name]: UnauthorizedError
}

// The mapDomainErrorToHttpError function takes a domain error and returns an instance of the corresponding HTTP error.
export const mapDomainErrorToHttpError = (error: Error): HttpError => {
  const HttpErrorConstructor = errorMappings[error.constructor.name]

  if (HttpErrorConstructor) {
    return new HttpErrorConstructor(error.message)
  } else {
    // If no matching domain error is found, return a new InternalServerError.
    return new InternalServerError(error.message)
  }
}
