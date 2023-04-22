import { APIGatewayProxyResult } from 'aws-lambda'

export function parseBody (body: string | null): any {
  if (!body) {
    throw new Error('Request body is missing')
  }

  try {
    return JSON.parse(body)
  } catch (error) {
    throw new Error('Invalid JSON format in request body')
  }
}

export function response (statusCode: number, body?: any): APIGatewayProxyResult {
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
