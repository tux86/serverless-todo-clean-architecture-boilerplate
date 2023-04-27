import { ApplicationError, AuthFailedError, EntityNotFound } from '@/application/errors'
import {
  BadRequestError,
  HttpError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError
} from '@/presentation/protocols/http-error'

export const mapDomainErrorToHttpError = (error: Error): HttpError => {
  if (error instanceof EntityNotFound) {
    return new NotFoundError(error.message)
  } else if (error instanceof ApplicationError) {
    return new BadRequestError(error.message)
  } else if (error instanceof AuthFailedError) {
    return new UnauthorizedError(error.message)
  } else {
    return new InternalServerError(error.message)
  }
}
