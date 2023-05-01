import { cognitoUserPoolEvent, dynamodbStreamEvent, getHandlerPath, httpApiEvent } from '@/common/aws'
import { AWSFunctions } from '@/common/aws/types'
import { AwsLambdaEnvironment } from '@serverless/typescript'

import { jwtAuthorizer } from '../helpers'

const environment: AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: '${param:userPoolId}',
  COGNITO_APP_CLIENT_ID: '${param:appClientId}',
  USERS_TABLE: '${param:usersTableName}'
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
    // getCurrentUser: {
    //   handler: getHandlerPath('user-api-index.getCurrentUserHandler'),
    //   environment,
    //   events: [httpApiEvent('get', '/users/current')]
    // },
    getUser: {
      handler: getHandlerPath('user-api-index.getUserHandler'),
      environment,
      events: [httpApiEvent('get', '/users/{userId}', jwtAuthorizer())]
    },
    deleteUser: {
      handler: getHandlerPath('user-api-index.deleteUserHandler'),
      environment,
      events: [httpApiEvent('delete', '/users/{userId}', jwtAuthorizer())]
    },
    preSignUp: {
      handler: getHandlerPath('user-cognito-triggers-index.preSignUpHandler'),
      events: [cognitoUserPoolEvent('${param:userPoolName}', 'PreSignUp', true)]
    },
    userDynamodbStreamHandler: {
      handler: getHandlerPath('user-dynamodb-stream-index.dynamoDBStreamHandler'),
      environment,
      events: [dynamodbStreamEvent('${param:usersTableStreamArn}')]
    }
  }
}
