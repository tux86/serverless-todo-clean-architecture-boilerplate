import { AWS } from '@serverless/typescript'

import { cognitoUserPool } from '@/infrastructure/iac/ressources/cognito/userPool'
import { dynamodbTodosTable } from '@/infrastructure/iac/ressources/dynamodb/todosTable'
import { dynamodbUsersTable } from '@/infrastructure/iac/ressources/dynamodb/usersTable'

export const usersTable = dynamodbUsersTable()
export const todosTable = dynamodbTodosTable()
export const userPool = cognitoUserPool()

export const resources = (): AWS['resources'] => {
  return {
    Resources: {
      ...usersTable.resources,
      ...todosTable.resources,
      ...userPool.resources
    },
    Outputs: {
      ...userPool.outputs
    }
  }
}
