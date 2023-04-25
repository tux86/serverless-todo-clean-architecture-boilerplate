import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { todosTable } from '@/infrastructure/iac/ressources'
import { createHandlerPath } from '@/infrastructure/iac/utilities'

const lambdaEnvironment: AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.TableName
}

export const todoFunctions = (): AWS['functions'] => {
  return {
    createTodo: {
      handler: createHandlerPath('todo-functions', 'createTodo'),
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
      handler: createHandlerPath('todo-functions', 'getTodo'),
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
      handler: createHandlerPath('todo-functions', 'listTodos'),
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
      handler: createHandlerPath('todo-functions', 'updateTodo'),
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
      handler: createHandlerPath('todo-functions', 'deleteTodo'),
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
