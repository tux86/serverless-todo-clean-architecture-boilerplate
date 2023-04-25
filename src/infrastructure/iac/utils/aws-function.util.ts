import { AWS } from '@serverless/typescript'

import { LambdaFunction } from '@/infrastructure/iac/types'
import { varToString } from '@/infrastructure/iac/utils/common.util'

export const awsFunction = (
  moduleName: string,
  handler: Record<string, unknown>,
  params: LambdaFunction
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
  path: string
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

export const createCognitoUserPoolEvent = (pool: string, trigger: string): any => ({
  cognitoUserPool: {
    pool,
    existing: true,
    trigger
  }
})
