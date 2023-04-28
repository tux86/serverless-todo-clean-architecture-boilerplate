import { AwsLambdaEnvironment } from '@serverless/typescript'

import { todosTable } from '@/infrastructure/iac/serverless/ressources'
import { AWSFunctions } from '@/infrastructure/iac/serverless/types'
import { getHandlerPath, httpApiEvent } from '@/infrastructure/iac/serverless/utils/aws-function.util'

const environment: AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.vars.TableName
}

export const todoFunctions = (): AWSFunctions => {
  return {
    createTodo: {
      handler: getHandlerPath('todo/create-todo.handler'),
      environment,
      events: [httpApiEvent('post', '/todos')]
    },
    getTodo: {
      handler: getHandlerPath('todo/get-todo.handler'),
      environment,
      events: [httpApiEvent('get', '/todos/{id}')]
    },
    listTodos: {
      handler: getHandlerPath('todo/list-todos.handler'),
      environment,
      events: [httpApiEvent('get', '/todos')]
    },
    updateTodo: {
      handler: getHandlerPath('todo/update-todo.handler'),
      environment,
      events: [httpApiEvent('put', '/todos/{todoId}')]
    },
    deleteTodo: {
      handler: getHandlerPath('todo/delete-todo.handler'),
      environment,
      events: [httpApiEvent('delete', '/todos/{todoId}')]
    }
  }
}
