import { AWSFunctionEvent, AWSHttpApiPath } from '@/infrastructure/serverless/utils/types'

export const httpApiEvent = (
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options',
  path: AWSHttpApiPath
): AWSFunctionEvent => ({
  httpApi: {
    method,
    path,
    authorizer: {
      name: 'jwtAuthorizer'
    }
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
