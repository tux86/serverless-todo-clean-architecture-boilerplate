import {
  ApplicationError,
  AuthFailedError,
  BadRequestError,
  EntityNotFound,
  HttpError,
  InputValidationError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  UserAccountAlreadyExists
} from '@/application/errors'

// Define an interface for the error mapping object.
interface ErrorMapping {
  [key: string]: new (message: string) => HttpError
}

// Create an error mapping object, which maps the domain error names to their corresponding HTTP error constructors.
const errorMappings: ErrorMapping = {
  [EntityNotFound.name]: NotFoundError,
  [InputValidationError.name]: BadRequestError,
  [ApplicationError.name]: BadRequestError,
  [AuthFailedError.name]: UnauthorizedError,
  [UserAccountAlreadyExists.name]: BadRequestError
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
