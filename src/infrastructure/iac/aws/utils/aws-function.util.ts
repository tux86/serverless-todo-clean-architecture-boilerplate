import { AWS } from '@serverless/typescript'

import { LambdaFunction, LambdaHTTPAPIPath } from '@/infrastructure/iac/aws/types'
import { varToString } from '@/infrastructure/iac/aws/utils/common.util'

export const awsFunction = (
  moduleName: string,
  handler: Record<string, unknown>,
  params: Omit<LambdaFunction, 'handler'>
): AWS['functions'] => {
  const functionName = varToString(handler)
  return {
    [functionName]: {
      handler: `src/infrastructure/aws/lambda/${moduleName}.${functionName}`,
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
