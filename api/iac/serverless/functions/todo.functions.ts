import { AwsLambdaEnvironment } from '@serverless/typescript'

import { getHandler, httpApiEvent } from '../../../../common/src/aws/helpers'
import { AWSFunctions } from '../../../../common/src/aws/types'
import { jwtAuthorizer } from '../helpers'

const environment: AwsLambdaEnvironment = {
  TODOS_TABLE: '${param:todosTableName}'
}

export const todoFunctions: AWSFunctions = {
  createTodo: {
    handler: getHandler('todo-api-index.createTodoHandler'),
    environment,
    events: [httpApiEvent('post', '/todos', jwtAuthorizer())]
  },
  updateTodo: {
    handler: getHandler('todo-api-index.updateTodoHandler'),
    environment,
    events: [httpApiEvent('put', '/todos/{todoId}', jwtAuthorizer())]
  },
  deleteTodo: {
    handler: getHandler('todo-api-index.deleteTodoHandler'),
    environment,
    events: [httpApiEvent('delete', '/todos/{todoId}', jwtAuthorizer())]
  },
  getTodo: {
    handler: getHandler('todo-api-index.getTodoHandler'),
    environment,
    events: [httpApiEvent('get', '/todos/{todoId}', jwtAuthorizer())]
  },
  listTodos: {
    handler: getHandler('todo-api-index.listTodosHandler'),
    environment,
    events: [httpApiEvent('get', '/todos', jwtAuthorizer())]
  }
}
