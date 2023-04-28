import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { Controller } from '@/api/interfaces/controller'
import { IHttpRequest } from '@/api/protocols/http-request'
import { parseApiGwRequestBody, toApiGwResponse } from '@/infrastructure/aws/helpers/api-gw'

export const lambdaHandlerAdapter = <T>(
  controller: Controller<T>
): ((event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>) => {
  return async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body = parseApiGwRequestBody(event.body)
    const request: IHttpRequest = {
      body,
      params: event.pathParameters || {},
      query: event.queryStringParameters || {},
      headers: event.headers || {}
    }

    const response = await controller.handleRequest(request)

    return toApiGwResponse(response.statusCode, response.body)
  }
}
