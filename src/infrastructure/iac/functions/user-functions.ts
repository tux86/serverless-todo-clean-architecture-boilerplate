import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import {
  authenticateUser,
  getUser,
  preSignUp,
  registerUser,
  userDynamodbStreamHandler
} from '@/infrastructure/aws/lambda/user-functions'
import { userPool, usersTable } from '@/infrastructure/iac/ressources'
import { awsFunction, dynamodbStreamEvent, httpApiEvent } from '@/infrastructure/iac/utils/aws-function.util'
import { ssmParameter } from '@/infrastructure/iac/utils/common.util'

const environment: AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: ssmParameter('cognito/userPoolId'),
  COGNITO_APP_CLIENT_ID: ssmParameter('cognito/userPoolClientId'),
  USERS_TABLE: usersTable.TableName
}

const moduleName = 'user-functions'
export const userFunctions = (): AWS['functions'] => {
  return {
    ...awsFunction(
      moduleName,
      { registerUser },
      {
        environment,
        timeout: 10,
        events: [httpApiEvent('post', '/users/register')]
      }
    ),
    ...awsFunction(
      moduleName,
      { authenticateUser },
      {
        environment,
        timeout: 10,
        events: [httpApiEvent('post', '/users/auth')]
      }
    ),
    ...awsFunction(
      moduleName,
      { getUser },
      {
        environment,
        timeout: 10,
        events: [httpApiEvent('get', '/users/{email}')]
      }
    ),
    ...awsFunction(
      moduleName,
      { preSignUp },
      {
        timeout: 10,
        events: [
          // TODO : fix existing helper
          {
            cognitoUserPool: {
              pool: userPool.UserPoolName,
              existing: true,
              trigger: 'PreSignUp'
            }
          }
        ]
      }
    ),
    ...awsFunction(
      moduleName,
      { userDynamodbStreamHandler },
      {
        environment,
        timeout: 10,
        events: [dynamodbStreamEvent(usersTable.StreamArn)]
      }
    )
  }
}
