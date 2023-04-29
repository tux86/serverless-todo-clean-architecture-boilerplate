import { AwsLambdaEnvironment } from '@serverless/typescript'

import { userPool, usersTable } from '@/infrastructure/iac/serverless/ressources'
import { AWSFunctions } from '@/infrastructure/iac/serverless/types'
import { getHandlerPath, ssmParameter } from '@/infrastructure/iac/serverless/utils'
import { cognitoUserPoolEvent, dynamodbStreamEvent, httpApiEvent } from '@/infrastructure/iac/serverless/utils/events'

const environment: AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: ssmParameter('cognito/userPoolId'),
  COGNITO_APP_CLIENT_ID: ssmParameter('cognito/userPoolClientId'),
  USERS_TABLE: usersTable.vars.TableName
}
export const userFunctions = (): AWSFunctions => {
  return {
    registerUser: {
      handler: getHandlerPath('user-api-index.registerUserHandler'),
      environment,
      events: [httpApiEvent('post', '/users/register')]
    },
    authenticateUser: {
      handler: getHandlerPath('user-api-index.authenticateUserHandler'),
      environment,
      events: [httpApiEvent('post', '/users/auth')]
    },
    getUser: {
      handler: getHandlerPath('user-api-index.getUserHandler'),
      environment,
      events: [httpApiEvent('get', '/users/{userId}')]
    },
    deleteUser: {
      handler: getHandlerPath('user-api-index.deleteUserHandler'),
      environment,
      events: [httpApiEvent('delete', '/users/{userId}')]
    },
    preSignUp: {
      handler: getHandlerPath('user-cognito-triggers-index.preSignUpHandler'),
      events: [cognitoUserPoolEvent(userPool.vars.UserPoolName, 'PreSignUp', true)]
    },
    userDynamodbStreamHandler: {
      handler: getHandlerPath('user-dynamodb-stream-index.dynamoDBStreamHandler'),
      environment,
      events: [dynamodbStreamEvent(usersTable.vars.StreamArn)]
    }
  }
}
