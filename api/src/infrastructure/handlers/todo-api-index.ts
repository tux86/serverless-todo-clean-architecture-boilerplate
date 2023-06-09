import 'reflect-metadata'
import { APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from 'aws-lambda'

import {
  createCreateTodoController,
  createDeleteTodoController,
  createGetTodoController,
  createListTodosController,
  createUpdateTodoController
} from '@/api/main/factories/controllers/todo.controllers.factory'

import { lambdaHandlerAdapter } from '../adapaters/lambda-handler.adapter'

export const createTodoHandler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createCreateTodoController())
  return await handler(event)
}

export const updateTodoHandler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createUpdateTodoController())
  return await handler(event)
}

export const deleteTodoHandler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createDeleteTodoController())
  return await handler(event)
}

export const getTodoHandler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createGetTodoController())
  return await handler(event)
}

export const listTodosHandler = async (
  event: APIGatewayProxyEventV2WithJWTAuthorizer
): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createListTodosController())
  return await handler(event)
}
