import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { userPool, usersTable } from '@/infra/iac/ressources'
import { createHandlerPath, ssmParameter } from '@/infra/iac/utilities'

const lambdaEnvironment: AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: ssmParameter('cognito/userPoolId'),
  COGNITO_APP_CLIENT_ID: ssmParameter('cognito/userPoolClientId'),
  USERS_TABLE: usersTable.TableName
}
export const userFunctions = (): AWS['functions'] => {
  return {
    registerUser: {
      handler: createHandlerPath('userHandler', 'registerUser'),
      environment: lambdaEnvironment,
      timeout: 10,
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
      timeout: 10,
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
      timeout: 10,
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
      timeout: 10,
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
}
