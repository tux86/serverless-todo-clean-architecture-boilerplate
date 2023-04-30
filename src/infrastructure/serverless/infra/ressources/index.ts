import { AWS } from '@serverless/typescript'

import { cognitoUserPool } from '@/infrastructure/serverless/infra/ressources/cogntio-user-pool'
import { dynamodbTodosTable } from '@/infrastructure/serverless/infra/ressources/dynamodb-todos-table'
import { dynamodbUsersTable } from '@/infrastructure/serverless/infra/ressources/dynamodb-users-table'

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
