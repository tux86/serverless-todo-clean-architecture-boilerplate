import { AWSFunctionEvent, AWSHttpApiPath } from '@/infrastructure/serverless/common/types'

export const httpApiEvent = (
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options',
  path: AWSHttpApiPath,
  authorizer?: any
): AWSFunctionEvent => ({
  httpApi: {
    method,
    path,
    ...authorizer
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
