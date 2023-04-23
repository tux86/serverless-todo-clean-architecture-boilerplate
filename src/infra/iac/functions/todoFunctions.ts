import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { todosTable } from '@/infra/iac/ressources'
import { createHandlerPath } from '@/infra/iac/utilities'

const lambdaEnvironment : AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.TableName
}
export const todoFunctions: AWS['functions'] = {
  createTodo: {
    handler: createHandlerPath('todoHandler', 'createTodo'),
    environment: lambdaEnvironment,
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
