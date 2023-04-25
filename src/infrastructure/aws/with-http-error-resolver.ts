import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { ApplicationError, AuthFailedError, EntityNotFound } from '@/application/errors'
import { toApiGwResponse } from '@/infrastructure/aws/api-gw/libs/utils'
import { LoggerFactory } from '@/infrastructure/utils/logger'
import {
  BadRequestError,
  HttpError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError
} from '@/presentation/errors'

const mapDomainErrorToHttpError = (error: Error): HttpError => {
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

export const withHttpErrorResolver = (handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      return await handler(event)
    } catch (error: any) {
      LoggerFactory.getInstance().error(error.message, error)
      const httpError = mapDomainErrorToHttpError(error)
      return toApiGwResponse(httpError.statusCode, {
        statusCode: httpError.statusCode,
        message: httpError.message
      })
    }
  }
}
