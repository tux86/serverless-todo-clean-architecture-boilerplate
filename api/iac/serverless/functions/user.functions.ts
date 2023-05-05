import { AwsLambdaEnvironment } from '@serverless/typescript'

import {
  cognitoUserPoolEvent,
  dynamodbStreamEvent,
  getHandler,
  httpApiEvent
} from '../../../../common/src/iac/serverless/helpers'
import { AWSFunctions } from '../../../../common/src/iac/serverless/types'
import { jwtAuthorizer } from '../helpers'

const environment: AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: '${param:userPoolId}',
  COGNITO_APP_CLIENT_ID: '${param:appClientId}',
  USERS_TABLE: '${param:usersTableName}'
}
export const userFunctions: AWSFunctions = {
  createAdminUser: {
    handler: getHandler('user-api-index.createAdminUserHandler'),
    environment,
    events: [httpApiEvent('post', '/users/admin')]
  },
  registerUser: {
    handler: getHandler('user-api-index.registerUserHandler'),
    environment,
    events: [httpApiEvent('post', '/users/register')]
  },
  authenticateUser: {
    handler: getHandler('user-api-index.authenticateUserHandler'),
    environment,
    events: [httpApiEvent('post', '/users/auth')]
  },
  updateUser: {
    handler: getHandler('user-api-index.updateUserHandler'),
    environment,
    events: [httpApiEvent('put', '/users/{userId}', jwtAuthorizer())]
  },
  getMe: {
    handler: getHandler('user-api-index.getMeHandler'),
    environment,
    events: [httpApiEvent('get', '/users/me', jwtAuthorizer())]
  },
  getUser: {
    handler: getHandler('user-api-index.getUserHandler'),
    environment,
    events: [httpApiEvent('get', '/users/{userId}', jwtAuthorizer())]
  },
  listUsers: {
    handler: getHandler('user-api-index.listUsersHandler'),
    environment,
    events: [httpApiEvent('get', '/users', jwtAuthorizer())]
  },
  deleteUser: {
    handler: getHandler('user-api-index.deleteUserHandler'),
    environment,
    events: [httpApiEvent('delete', '/users/{userId}', jwtAuthorizer())]
  },
  preSignUp: {
    handler: getHandler('user-cognito-triggers-index.preSignUpHandler'),
    events: [cognitoUserPoolEvent('${param:userPoolName}', 'PreSignUp', true)]
  },
  preTokenGeneration: {
    handler: getHandler('user-cognito-triggers-index.preTokenGenerationHandler'),
    environment: {
      USERS_TABLE: '${param:usersTableName}'
    },
    events: [cognitoUserPoolEvent('${param:userPoolName}', 'PreTokenGeneration', true)]
  },
  userDynamodbStream: {
    handler: getHandler('user-dynamodb-stream-index.dynamoDBStreamHandler'),
    environment,
    events: [dynamodbStreamEvent('${param:usersTableStreamArn}')]
  }
}
