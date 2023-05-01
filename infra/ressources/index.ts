import { AWS } from '@serverless/typescript'

import { cognitoUserPool } from './cogntio-user-pool'
import { dynamodbTodosTable } from './dynamodb-todos-table'
import { dynamodbUsersTable } from './dynamodb-users-table'

export const usersTable = dynamodbUsersTable()
export const todosTable = dynamodbTodosTable()
export const userPool = cognitoUserPool()

export const resources = (): AWS['resources'] => {
  return {
    Resources: {
      // cognito
      ...userPool.resources,
      // dynamodb
      ...usersTable.resources,
      ...todosTable.resources
    },
    Outputs: {
      // cognito
      ...userPool.outputs,
      // dynamodb
      ...usersTable.outputs,
      ...todosTable.outputs
    }
  }
}
