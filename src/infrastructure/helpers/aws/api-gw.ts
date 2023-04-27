import { APIGatewayProxyResult } from 'aws-lambda'

export function parseApiGwRequestBody<T>(body: string | null): T {
  try {
    return JSON.parse(body) as T // Todo  Remove generic
  } catch (error) {
    throw new Error('Invalid JSON format in request body')
  }
}

export function toApiGwResponse(statusCode: number, body?: any): APIGatewayProxyResult {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}
