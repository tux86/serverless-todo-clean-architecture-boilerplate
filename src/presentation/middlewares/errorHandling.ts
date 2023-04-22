import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { UseCaseError } from '@/application/errors'
import { EntityNotFound } from '@/domain/errors'
import { BadRequestError, InternalServerError, NotFoundError } from '@/presentation/errors'
import { response } from '@/presentation/utils/apigw'

export const withErrorHandling = (
  handler: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>
) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      return await handler(event)
    } catch (error) {
      let httpError

      if (error instanceof EntityNotFound) {
        httpError = new NotFoundError(error.message)
      } else if (error instanceof UseCaseError) {
        httpError = new BadRequestError(error.message)
      } else {
        // If the error is not a known business logic error, keep the original error.
        httpError = new InternalServerError(error.message)
      }

      return response(httpError.statusCode, { statusCode: httpError.statusCode, message: httpError.message })
    }
  }
}
