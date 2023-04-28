import { AWS, AwsLambdaEnvironment } from '@serverless/typescript'

import { todosTable } from '@/infrastructure/iac/serverless/ressources'
import { awsFunction, httpApiEvent } from '@/infrastructure/iac/serverless/utils/aws-function.util'

const environment: AwsLambdaEnvironment = {
  TODOS_TABLE: todosTable.TableName
}

const moduleName = 'src/infrastructure/handlers/todo'

export const todoFunctions = (): AWS['functions'] => {
  return {
    ...awsFunction('createTodo', `${moduleName}/create-todo-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('post', '/todos')]
    }),
    ...awsFunction('getTodo', `${moduleName}/get-todo-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('get', '/todos/{id}')]
    }),
    ...awsFunction('listTodos', `${moduleName}/list-todos-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('get', '/todos')]
    }),
    ...awsFunction('updateTodo', `${moduleName}/update-todo-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('put', '/todos/{todoId}')]
    }),
    ...awsFunction('deleteTodo', `${moduleName}/delete-todo-handler.handler`, {
      environment,
      timeout: 10,
      events: [httpApiEvent('delete', '/todos/{todoId}')]
    })
  }
}
