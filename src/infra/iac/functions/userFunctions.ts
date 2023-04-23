import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { usersTable, userPool } from '@/infra/iac/ressources'
import { createHandlerPath, ssmParameter } from '@/infra/iac/utilities'

const lambdaEnvironment : AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: ssmParameter('cognito/userPoolId'),
  COGNITO_APP_CLIENT_ID: ssmParameter('cognito/userPoolClientId'),
  USERS_TABLE: usersTable.TableName
}
export const userFunctions : AWS['functions'] = {
  registerUser: {
    handler: createHandlerPath('userHandler', 'registerUser'),
    environment: lambdaEnvironment,
    events: [
      {
        httpApi: {
          method: 'post',
          path: '/users/register'
        }
      }
    ]
  },
  authenticateUser: {
    handler: createHandlerPath('userHandler', 'authenticateUser'),
    environment: lambdaEnvironment,
    events: [
      {
        httpApi: {
          method: 'post',
          path: '/users/auth'
        }
      }
    ]
  },
  getUser: {
    handler: createHandlerPath('userHandler', 'getUser'),
    environment: lambdaEnvironment,
    events: [
      {
        httpApi: {
          method: 'get',
          path: '/users/{email}'
        }
      }
    ]
  },
  preSignUp: {
    handler: createHandlerPath('userHandler', 'preSignUp'),
    events: [
      {
        cognitoUserPool: {
          pool: userPool.UserPoolName,
          existing: true,
          trigger: 'PreSignUp'
        }
      }
    ]
  }
}
