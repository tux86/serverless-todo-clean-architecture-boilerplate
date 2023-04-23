import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UseCaseError } from '@/application/errors'
import { AuthFailedError, EntityNotFound } from '@/domain/errors'
import { BadRequestError, HttpError, InternalServerError, NotFoundError, UnauthorizedError } from '@/presentation/errors'
import { toApiGwResponse } from '@/presentation/utils/apiGateway'

const mapDomainErrorToHttpError = (error: Error) : HttpError => {
  if (error instanceof EntityNotFound) {
    return new NotFoundError(error.message)
  } else if (error instanceof UseCaseError) {
    return new BadRequestError(error.message)
  } else if (error instanceof AuthFailedError) {
    return new UnauthorizedError(error.message)
  } else {
    return new InternalServerError(error.message)
  }
}

export const apiGatewayHandler = (
  handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>
) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      return await handler(event)
    } catch (error) {
      const httpError = mapDomainErrorToHttpError(error)
      return toApiGwResponse(httpError.statusCode, { statusCode: httpError.statusCode, message: httpError.message })
    }
  }
}
