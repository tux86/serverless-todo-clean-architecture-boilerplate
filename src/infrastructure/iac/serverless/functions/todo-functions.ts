import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { handlersPath } from '@/infrastructure/iac/serverless/functions/index'
import { todosTable } from '@/infrastructure/iac/serverless/ressources'
import { httpApiEvent } from '@/infrastructure/iac/serverless/utils/aws-function.util'

const environment: AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.TableName
}

export const todoFunctions = (): AWS['functions'] => {
  return {
    createTodo: {
      handler: `${handlersPath}/todo/create-todo.handler`,
      environment,
      events: [httpApiEvent('post', '/todos')]
    },
    getTodo: {
      handler: `${handlersPath}/todo/get-todo.handler`,
      environment,
      events: [httpApiEvent('get', '/todos/{id}')]
    },
    listTodos: {
      handler: `${handlersPath}/todo/list-todos.handler`,
      environment,
      events: [httpApiEvent('get', '/todos')]
    },
    updateTodo: {
      handler: `${handlersPath}/todo/update-todo.handler`,
      environment,
      events: [httpApiEvent('put', '/todos/{todoId}')]
    },
    deleteTodo: {
      handler: `${handlersPath}/todo/delete-todo.handler`,
      environment,
      events: [httpApiEvent('delete', '/todos/{todoId}')]
    }
  }
}
