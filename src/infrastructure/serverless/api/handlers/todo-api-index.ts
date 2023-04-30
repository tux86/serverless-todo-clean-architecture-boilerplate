import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda'

import { lambdaHandlerAdapter } from '@/infrastructure/adapaters/lambda-handler.adapter'
import {
  createCreateTodoController,
  createDeleteTodoController,
  createGetTodoController,
  createListTodosController,
  createUpdateTodoController
} from '@/main/factories/controllers/todo.controllers.factory'

export const createTodoHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createCreateTodoController())
  return await handler(event)
}

export const updateTodoHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createUpdateTodoController())
  return await handler(event)
}

export const deleteTodoHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createDeleteTodoController())
  return await handler(event)
}

export const getTodoHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  console.log(event.requestContext)
  const handler = lambdaHandlerAdapter(createGetTodoController())
  return await handler(event)
}

export const listTodosHandler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const handler = lambdaHandlerAdapter(createListTodosController())
  return await handler(event)
}
