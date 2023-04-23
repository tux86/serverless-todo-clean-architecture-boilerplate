import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { usersTable } from '@/infra/iac/ressources'
import { ssmParameter } from '@/infra/iac/utilities'

const lambdaEnvironment : AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: ssmParameter('cognito/userPoolId'),
  COGNITO_APP_CLIENT_ID: ssmParameter('cognito/userPoolClientId'),
  USERS_TABLE: usersTable.TableName
}
export const userFunctions : AWS['functions'] = {
  registerUser: {
    handler: 'src/presentation/handlers/userHandler.registerUser',
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
    handler: 'src/presentation/handlers/userHandler.authenticateUser',
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
    handler: 'src/presentation/handlers/userHandler.getUser',
    environment: lambdaEnvironment,
    events: [
      {
        httpApi: {
          method: 'get',
          path: '/users/{email}'
        }
      }
    ]
  }
}
