import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { Controller } from '@/application/interfaces/controller'
import { Request } from '@/application/interfaces/request'
import { parseApiGwRequestBody, toApiGwResponse } from '@/infrastructure/aws/api-gw/libs/utils'
import { withHttpErrorResolver } from '@/infrastructure/aws/with-http-error-resolver'

export const awsHandlerAdapter = async <T>(
  controller: Controller<T>,
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = parseApiGwRequestBody(event.body)
  const request: Request = {
    body,
    params: event.pathParameters || {},
    query: event.queryStringParameters || {},
    headers: event.headers || {}
  }
  const response = await controller.handleRequest(request)

  return toApiGwResponse(response.statusCode, response.body)
}

export const createApiGatewayHandler = <T>(
  controller: Controller<T>
): ((event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const handler = withHttpErrorResolver(async (e) => await awsHandlerAdapter<T>(controller, e))
    return handler(event)
  }
}
