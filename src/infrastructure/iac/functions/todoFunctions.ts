import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { todosTable } from '@/infrastructure/iac/ressources'
import { createHandlerPath } from '@/infrastructure/iac/utilities'

const lambdaEnvironment: AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.TableName
}

export const todoFunctions = (): AWS['functions'] => {
  return {
    createTodo: {
      handler: createHandlerPath('todoFunctions', 'createTodo'),
      environment: lambdaEnvironment,
      timeout: 10,
      events: [
        {
          httpApi: {
            method: 'post',
            path: '/todos'
          }
        }
      ]
    },
    getTodo: {
      handler: createHandlerPath('todoFunctions', 'getTodo'),
      environment: lambdaEnvironment,
      timeout: 10,
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/todos/{id}'
          }
        }
      ]
    },
    listTodos: {
      handler: createHandlerPath('todoFunctions', 'listTodos'),
      environment: lambdaEnvironment,
      timeout: 10,
      events: [
        {
          httpApi: {
            method: 'get',
            path: '/todos'
          }
        }
      ]
    },
    updateTodo: {
      handler: createHandlerPath('todoFunctions', 'updateTodo'),
      environment: lambdaEnvironment,
      timeout: 10,
      events: [
        {
          httpApi: {
            method: 'put',
            path: '/todos/{todoId}'
          }
        }
      ]
    },
    deleteTodo: {
      handler: createHandlerPath('todoFunctions', 'deleteTodo'),
      environment: lambdaEnvironment,
      timeout: 10,
      events: [
        {
          httpApi: {
            method: 'delete',
            path: '/todos/{todoId}'
          }
        }
      ]
    }
  }
}
