import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { todosTable } from '@/infra/iac/ressources'

const lambdaEnvironment : AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.TableName
}
export const todoFunctions: AWS['functions'] = {
  createTodo: {
    handler: 'src/presentation/handlers/todoHandler.createTodo',
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
    handler: 'src/presentation/handlers/todoHandler.getTodo',
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
    handler: 'src/presentation/handlers/todoHandler.listTodos',
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
    handler: 'src/presentation/handlers/todoHandler.updateTodo',
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
    handler: 'src/presentation/handlers/todoHandler.deleteTodo',
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
