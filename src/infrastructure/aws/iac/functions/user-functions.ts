import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { userPool, usersTable } from '@/infrastructure/aws/iac/ressources'
import {
  awsFunction,
  cognitoUserPoolEvent,
  dynamodbStreamEvent,
  httpApiEvent
} from '@/infrastructure/aws/iac/utils/aws-function.util'
import { ssmParameter } from '@/infrastructure/aws/iac/utils/common.util'

const environment: AwsLambdaEnvironment = {
  COGNITO_USER_POOL_ID: ssmParameter('cognito/userPoolId'),
  COGNITO_APP_CLIENT_ID: ssmParameter('cognito/userPoolClientId'),
  USERS_TABLE: usersTable.TableName
}

const moduleName = 'src/infrastructure/aws/handlers/user'

export const userFunctions = (): AWS['functions'] => {
  return {
    ...awsFunction('registerUser', `${moduleName}/register-user-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('post', '/users/register')]
    }),
    ...awsFunction('authenticateUser', `${moduleName}/authenticate-user-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('post', '/users/auth')]
    }),
    ...awsFunction('getUser', `${moduleName}/get-user-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('get', '/users/{email}')]
    }),
    ...awsFunction('deleteUser', `${moduleName}/delete-user-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('delete', '/users/{userId}')]
    }),
    ...awsFunction('preSignUp', `${moduleName}/pre-signup-handler.handler`, {
      timeout: 10,
      events: [cognitoUserPoolEvent(userPool.UserPoolName, 'PreSignUp', true)]
    }),
    ...awsFunction('userDynamodbStreamHandler', `${moduleName}/user-dynamodb-stream-handler.handler`, {
      environment,
      timeout: 10,
      events: [dynamodbStreamEvent(usersTable.StreamArn)]
    })
  }
}
