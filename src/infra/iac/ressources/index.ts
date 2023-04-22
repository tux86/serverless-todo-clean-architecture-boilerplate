import { AWS } from '@serverless/typescript'

import { createUserPool } from '@/infra/iac/ressources/cognito/userPool'
import { createTodosTable } from '@/infra/iac/ressources/dynamodb/todosTable'

export const todosTable = createTodosTable()
export const userPool = createUserPool()

export const createResources = () : AWS['resources'] => {
  return {
    Resources: {
      ...todosTable.resources,
      ...userPool.resources
    },
    Outputs: {
      ...userPool.outputs
    }
  }
}
