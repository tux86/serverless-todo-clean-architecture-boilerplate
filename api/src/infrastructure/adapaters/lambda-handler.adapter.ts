import { Dictionary } from '@/common/types'
import { APIGatewayProxyEventV2, APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from 'aws-lambda'

import { Claims } from '@/api/application/ports/claims'
import { Controller } from '@/api/application/ports/controller'
import { HttpRequestAttributes, IHttpRequest } from '@/api/application/ports/http-request'

import { parseJsonRequestBody, toApiGwResponse } from '../helpers/api-gateway'

const mapClaimsToRequestAttributes = (claims: Dictionary<any>): HttpRequestAttributes | undefined => {
  if (!claims) {
    return undefined
  }
  return {
    userId: String(claims.userId),
    email: String(claims.email),
    role: String(claims.role)
  } as Claims
}

export const lambdaHandlerAdapter = <T>(
  controller: Controller<T>
): ((event: APIGatewayProxyEventV2 | APIGatewayProxyEventV2WithJWTAuthorizer) => Promise<APIGatewayProxyResultV2>) => {
  return async (event) => {
    let { body } = event

    // Verify the event has JWT Authorizer information and populate custom attributes using its claims.
    const claims = 'authorizer' in event.requestContext ? event.requestContext?.authorizer.jwt?.claims : undefined
    const attributes = mapClaimsToRequestAttributes(claims)

    if (event.headers['content-type'] === 'application/json' && body) {
      body = parseJsonRequestBody(event.body)
    }

    const request: IHttpRequest = {
      body,
      params: event.pathParameters || {},
      query: event.queryStringParameters || {},
      headers: event.headers || {},
      attributes
    }

    const response = await controller.handleRequest(request)

    return toApiGwResponse(response.statusCode, response.body)
  }
}
