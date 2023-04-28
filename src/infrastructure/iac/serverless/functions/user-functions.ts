import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { handlersPath } from '@/infrastructure/iac/serverless/functions/index'
import { userPool, usersTable } from '@/infrastructure/iac/serverless/ressources'
import {
  cognitoUserPoolEvent,
  dynamodbStreamEvent,
  httpApiEvent
} from '@/infrastructure/iac/serverless/utils/aws-function.util'
import { ssmParameter } from '@/infrastructure/iac/serverless/utils/common.util'

const environment: AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: ssmParameter('cognito/userPoolId'),
  COGNITO_APP_CLIENT_ID: ssmParameter('cognito/userPoolClientId'),
  USERS_TABLE: usersTable.TableName
}

export const userFunctions = (): AWS['functions'] => {
  return {
    registerUser: {
      handler: `${handlersPath}/user/register-user.handler`,
      environment,
      events: [httpApiEvent('post', '/users/register')]
    },
    authenticateUser: {
      handler: `${handlersPath}/user/authenticate-user.handler`,
      environment,
      events: [httpApiEvent('post', '/users/auth')]
    },
    getUser: {
      handler: `${handlersPath}/user/get-user.handler`,
      environment,
      events: [httpApiEvent('get', '/users/{email}')]
    },
    deleteUser: {
      handler: `${handlersPath}/user/delete-user.handler`,
      environment,
      events: [httpApiEvent('delete', '/users/{userId}')]
    },
    preSignUp: {
      handler: `${handlersPath}/user/pre-signup.handler`,
      events: [cognitoUserPoolEvent(userPool.UserPoolName, 'PreSignUp', true)]
    },
    userDynamodbStreamHandler: {
      handler: `${handlersPath}/user/user-dynamodb-stream.handler`,
      environment,
      events: [dynamodbStreamEvent(usersTable.StreamArn)]
    }
  }
}
