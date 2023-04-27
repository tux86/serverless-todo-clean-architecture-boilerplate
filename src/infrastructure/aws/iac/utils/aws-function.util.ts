import { AWS } from '@serverless/typescript'

import { LambdaFunction, LambdaHTTPAPIPath } from '@/infrastructure/aws/iac/types'

export const awsFunction = (
  functionName: string,
  handler: string,
  params: Omit<LambdaFunction, 'handler'>
): AWS['functions'] => {
  return {
    [functionName]: {
      handler,
      ...params
    }
  }
}

export const httpApiEvent = (
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options',
  path: LambdaHTTPAPIPath
): any => ({
  httpApi: {
    method,
    path
  }
})

export const dynamodbStreamEvent = (arn: string): any => ({
  stream: {
    type: 'dynamodb',
    arn
  }
})

export const cognitoUserPoolEvent = (pool: string, trigger: string, existing: boolean): any => ({
  cognitoUserPool: {
    pool,
    existing,
    trigger
  }
})
