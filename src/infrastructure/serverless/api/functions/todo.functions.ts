import { AwsLambdaEnvironment } from '@serverless/typescript'

import { jwtAuthorizer } from '@/infrastructure/serverless/api/helpers'
import { getHandlerPath, httpApiEvent } from '@/infrastructure/serverless/common'
import { AWSFunctions } from '@/infrastructure/serverless/common/types'

const environment: AwsLambdaEnvironment = {
  TODOS_TABLE: '${param:todosTableName}'
}

export const todoFunctions = (): AWSFunctions => {
  return {
    createTodo: {
      handler: getHandlerPath('todo-api-index.createTodoHandler'),
      environment,
      events: [httpApiEvent('post', '/todos', jwtAuthorizer())]
    },
    updateTodo: {
      handler: getHandlerPath('todo-api-index.updateTodoHandler'),
      environment,
      events: [httpApiEvent('put', '/todos/{todoId}', jwtAuthorizer())]
    },
    deleteTodo: {
      handler: getHandlerPath('todo-api-index.deleteTodoHandler'),
      environment,
      events: [httpApiEvent('delete', '/todos/{todoId}', jwtAuthorizer())]
    },
    getTodo: {
      handler: getHandlerPath('todo-api-index.getTodoHandler'),
      environment,
      events: [httpApiEvent('get', '/todos/{todoId}', jwtAuthorizer())]
    },
    listTodos: {
      handler: getHandlerPath('todo-api-index.listTodosHandler'),
      environment,
      events: [httpApiEvent('get', '/todos', jwtAuthorizer())]
    }
  }
}
