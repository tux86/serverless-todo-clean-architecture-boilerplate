import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import {
  createCreateTodoController,
  createDeleteTodoController,
  createGetTodoController,
  createListTodosController,
  createUpdateTodoController
} from '@/main/factories/controllers/todo.controllers.factory'

export const createTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createCreateTodoController())
  return await handler(event)
}

export const updateTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createUpdateTodoController())
  return await handler(event)
}

export const deleteTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createDeleteTodoController())
  return await handler(event)
}

export const getTodoHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createGetTodoController())
  return await handler(event)
}

export const listTodosHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const handler = lambdaHandlerAdapter(createListTodosController())
  return await handler(event)
}
