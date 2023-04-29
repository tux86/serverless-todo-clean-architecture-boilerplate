import { AwsLambdaEnvironment } from '@serverless/typescript'

import { todosTable } from '@/infrastructure/iac/serverless/ressources'
import { AWSFunctions } from '@/infrastructure/iac/serverless/types'
import { getHandlerPath, httpApiEvent } from '@/infrastructure/iac/serverless/utils'

const environment: AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.vars.TableName
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
