import { AwsLambdaEnvironment } from '@serverless/typescript'

import { getHandlerPath, httpApiEvent } from '@/infrastructure/serverless/utils'
import { AWSFunctions } from '@/infrastructure/serverless/utils/types'

const environment: AwsLambdaEnvironment = {
  TODOS_TABLE: '${param:todosTableName}'
}

export const todoFunctions = (): AWSFunctions => {
  return {
    createTodo: {
      handler: getHandlerPath('todo-api-index.createTodoHandler'),
      environment,
      events: [httpApiEvent('post', '/todos')]
    },
    updateTodo: {
      handler: getHandlerPath('todo-api-index.updateTodoHandler'),
      environment,
      events: [httpApiEvent('put', '/todos/{todoId}')]
    },
    deleteTodo: {
      handler: getHandlerPath('todo-api-index.deleteTodoHandler'),
      environment,
      events: [httpApiEvent('delete', '/todos/{todoId}')]
    },
    getTodo: {
      handler: getHandlerPath('todo-api-index.getTodoHandler'),
      environment,
      events: [httpApiEvent('get', '/todos/{todoId}')]
    },
    listTodos: {
      handler: getHandlerPath('todo-api-index.listTodosHandler'),
      environment,
      events: [httpApiEvent('get', '/todos')]
    }
  }
}
