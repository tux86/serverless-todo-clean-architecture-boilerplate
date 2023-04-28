import { AWSHttpApiPath } from '@/infrastructure/iac/serverless/types'

export const getHandlerPath = (handler: string) => {
  return `src/infrastructure/handlers/${handler}`
}

export const httpApiEvent = (
  method: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options',
  path: AWSHttpApiPath
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
