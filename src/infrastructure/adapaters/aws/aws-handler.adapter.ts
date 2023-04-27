import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { parseApiGwRequestBody, toApiGwResponse } from '@/infrastructure/helpers/aws/api-gw'
import { Controller } from '@/presentation/protocols/controller'
import { IHttpRequest } from '@/presentation/protocols/http-request'

export const awsHandlerAdapter = <T>(
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
