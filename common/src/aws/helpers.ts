import { AWSFunctionEvent, AWSHttpApiPath } from './types'

export const varToString = (varObj: Record<string, unknown>): string => {
  return Object.keys(varObj)[0]
}

/**
 * Generates a namespaced resource name by combining the provided name
 * with a prefix and a separator.
 */
export const generatePrefixedResourceName = (name: string): string => ['${self:service}', '${sls:stage}', name].join('-')


export const getHandler = (handler: string): string => {
  return `./src/infrastructure/handlers/${handler}`
}


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


