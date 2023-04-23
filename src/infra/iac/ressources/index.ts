import { AWS } from '@serverless/typescript'

import { createUserPool } from '@/infra/iac/ressources/cognito/userPool'
import { createTodosTable } from '@/infra/iac/ressources/dynamodb/todosTable'
import { createUsersTable } from '@/infra/iac/ressources/dynamodb/usersTable'

export const usersTable = createUsersTable()
export const todosTable = createTodosTable()
export const userPool = createUserPool()

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
