import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { todosTable } from '@/infra/iac/ressources'
import { createHandlerPath } from '@/infra/iac/utilities'

const lambdaEnvironment: AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.TableName
}

export const todoFunctions = (): AWS['functions'] => {
  return {
    createTodo: {
      handler: createHandlerPath('todoHandler', 'createTodo'),
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
      handler: createHandlerPath('todoHandler', 'getTodo'),
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
      handler: createHandlerPath('todoHandler', 'listTodos'),
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
      handler: createHandlerPath('todoHandler', 'updateTodo'),
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
      handler: createHandlerPath('todoHandler', 'deleteTodo'),
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
