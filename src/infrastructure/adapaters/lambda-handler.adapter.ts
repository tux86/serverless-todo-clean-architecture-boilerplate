import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

import { Controller } from '@/application/ports/controller'
import { IHttpRequest } from '@/application/ports/http-request'
import { parseJsonRequestBody, toApiGwResponse } from '@/infrastructure/helpers/api-gateway'

export const lambdaHandlerAdapter = <T>(
  controller: Controller<T>
): ((event: APIGatewayProxyEventV2) => Promise<APIGatewayProxyResultV2>) => {
  return async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
    let { body } = event
    console.log('===== event2444')

    if (event.headers['content-type'] === 'application/json' && body) {
      body = parseJsonRequestBody(event.body)
    }

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
