import { AwsLambdaEnvironment } from '@serverless/typescript'

import { userPool, usersTable } from '@/infrastructure/iac/serverless/ressources'
import { AWSFunctions } from '@/infrastructure/iac/serverless/types'
import {
  cognitoUserPoolEvent,
  dynamodbStreamEvent,
  getHandlerPath,
  httpApiEvent
} from '@/infrastructure/iac/serverless/utils/aws-function.util'
import { ssmParameter } from '@/infrastructure/iac/serverless/utils/common.util'

const environment: AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: ssmParameter('cognito/userPoolId'),
  COGNITO_APP_CLIENT_ID: ssmParameter('cognito/userPoolClientId'),
  USERS_TABLE: usersTable.vars.TableName
}
export const userFunctions = (): AWSFunctions => {
  return {
    registerUser: {
      handler: getHandlerPath('user/register-user.handler'),
      environment,
      events: [httpApiEvent('post', '/users/register')]
    },
    authenticateUser: {
      handler: getHandlerPath('user/authenticate-user.handler'),
      environment,
      events: [httpApiEvent('post', '/users/auth')]
    },
    getUser: {
      handler: getHandlerPath('user/get-user.handler'),
      environment,
      events: [httpApiEvent('get', '/users/{email}')]
    },
    deleteUser: {
      handler: getHandlerPath('user/delete-user.handler'),
      environment,
      events: [httpApiEvent('delete', '/users/{userId}')]
    },
    preSignUp: {
      handler: getHandlerPath('user/pre-signup.handler'),
      events: [cognitoUserPoolEvent(userPool.vars.UserPoolName, 'PreSignUp', true)]
    },
    userDynamodbStreamHandler: {
      handler: getHandlerPath('user/user-dynamodb-stream.handler'),
      environment,
      events: [dynamodbStreamEvent(usersTable.vars.StreamArn)]
    }
  }
}
