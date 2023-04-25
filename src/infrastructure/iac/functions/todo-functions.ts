import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { createTodo, deleteTodo, getTodo, listTodos, updateTodo } from '@/infrastructure/aws/lambda/todo-functions'
import { todosTable } from '@/infrastructure/iac/ressources'
import { awsFunction, httpApiEvent } from '@/infrastructure/iac/utils/aws-function.util'

const environment: AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.TableName
}

const moduleName = 'todo-functions'

export const todoFunctions = (): AWS['functions'] => {
  return {
    ...awsFunction(
      moduleName,
      { createTodo },
      {
        environment,
        timeout: 10,
        events: [httpApiEvent('post', '/todos')]
      }
    ),
    ...awsFunction(
      moduleName,
      { getTodo },
      {
        environment,
        timeout: 10,
        events: [httpApiEvent('get', '/todos/{id}')]
      }
    ),
    ...awsFunction(
      moduleName,
      { listTodos },
      {
        environment,
        timeout: 10,
        events: [httpApiEvent('get', '/todos')]
      }
    ),
    ...awsFunction(
      moduleName,
      { updateTodo },
      {
        environment,
        timeout: 10,
        events: [httpApiEvent('put', '/todos/{todoId}')]
      }
    ),
    ...awsFunction(
      moduleName,
      { deleteTodo },
      {
        environment,
        timeout: 10,
        events: [httpApiEvent('delete', '/todos/{todoId}')]
      }
    )
  }
}
